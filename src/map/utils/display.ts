import type { PayloadAction } from '@reduxjs/toolkit';
import { MarkerInfo } from 'features/map/mapSlice';
import { getMiniToolTipTemplate } from 'map/overlays/miniTooltip';
import { getPagedToolTipTemplate, getToolTipTemplate } from 'map/overlays/tooltip';
import shortid from 'shortid';
import { KakaoLatLng } from 'types/map';
import { Shop } from 'types/shop';

import KakaoUtils from '.';

type MarkerOverlayDataType = Array<
  Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'> & {
    latlng: KakaoLatLng | null;
  }
>;

export const displayStaticMarker = async (
  kakaoUtils: KakaoUtils,
  shopInfo: Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>,
) => {
  const { landAddress, shopName } = shopInfo;
  try {
    const markerPosition = await kakaoUtils.getLocationByAddress({
      address: landAddress,
      shopName,
    });
    const marker = kakaoUtils.createMarker({
      markerPosition,
      imageXY: [32, 38],
      offsetXY: [18, 36],
      shopName,
    });

    const customOverlay = kakaoUtils.createCustomOverlay(marker);

    customOverlay.setContent(getMiniToolTipTemplate(shopInfo));
    kakaoUtils.setMapLevel(1);

    marker.setMap(kakaoUtils.kakaoInstance);
  } catch (error) {
    console.error(`${shopName}의 주소를 나타내는데 실패했어요. ${error}`);
  }
};

const groupShopByEqualMarkerPosition = (shopListWithMarkerPosition: MarkerOverlayDataType) => {
  const grouped = new Array(shopListWithMarkerPosition.length).fill(false);
  const groupedShopListByMarkerPosition: MarkerOverlayDataType[] = [];

  shopListWithMarkerPosition.forEach((shopInfo, index) => {
    const { latlng } = shopInfo;
    if (grouped[index] || !latlng) return;

    const currentGroupIndex = groupedShopListByMarkerPosition.length;

    groupedShopListByMarkerPosition[currentGroupIndex] = [shopInfo];

    shopListWithMarkerPosition.forEach((comparedInfo, comparedIndex) => {
      if (comparedIndex <= index) return;
      const { latlng: comparedLatLng } = comparedInfo;
      if (!comparedLatLng || grouped[comparedIndex]) return;
      if (latlng.equals(comparedLatLng)) {
        grouped[comparedIndex] = true;
        groupedShopListByMarkerPosition[currentGroupIndex].push(comparedInfo);
      }
    });

    grouped[index] = true;
  });

  return groupedShopListByMarkerPosition;
};

const getPagedOrSingleTooltipTemplate = (
  mayGroupedList: MarkerOverlayDataType,
  navigate: (path: string) => void,
) => {
  if (mayGroupedList.length === 1)
    return { tooltip: getToolTipTemplate(mayGroupedList[0], navigate), setPage: null };

  return getPagedToolTipTemplate(mayGroupedList, navigate);
};

export const displayDynamicMarkers = async (
  kakaoUtils: KakaoUtils,
  shopList: Array<Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>>,
  addMarkerToList: (markerInfo: MarkerInfo) => PayloadAction<MarkerInfo>,
  changeClickState: (markerInfo: MarkerInfo) => PayloadAction<MarkerInfo>,
  navigate: (path: string) => void,
) => {
  try {
    const markerImage = kakaoUtils.createMarkerImage([32, 38], [18, 36]);
    const activeMarkerImage = kakaoUtils.createMarkerImage([32, 38], [18, 36], true);

    const locationPromiseList = shopList.map(async ({ landAddress, shopName }) =>
      kakaoUtils.getLocationByAddress({
        address: landAddress,
        shopName,
      }),
    );

    const settledPromises = await Promise.allSettled(locationPromiseList);
    const shopListWithMarkerPosition = settledPromises.reduce((acc, setteledPromise, index) => {
      if (setteledPromise.status === 'fulfilled')
        return [
          ...acc,
          {
            ...shopList[index],
            latlng: setteledPromise.value,
          },
        ];

      return acc;
    }, [] as MarkerOverlayDataType);

    /**
     * 동일한 좌표를 갖는 소품샵들을 배열로 그룹화하는 작업.
     * 작업의 편의를 위해 동일한 좌표가 없는 소품샵도 길이가 1인 배열로 표현.
     */
    const groupedShopListByMarkerPosition: MarkerOverlayDataType[] = groupShopByEqualMarkerPosition(
      shopListWithMarkerPosition,
    );

    /**
     * 하나의 마커에 그룹화된 소품샵들을 오버레이에 올림.
     */
    groupedShopListByMarkerPosition.forEach((groupedShopList) => {
      if (!groupedShopList.length) return;
      const shopNameList = groupedShopList.map(({ shopName }) => shopName);
      const { latlng } = groupedShopList[0];
      const marker = kakaoUtils.createMarker({
        markerPosition: latlng,
        image: markerImage,
        shopName: 'group' + shortid(),
      });

      const customOverlay = kakaoUtils.createCustomOverlay(marker);

      marker.setMap(kakaoUtils.kakaoInstance);
      customOverlay.setMap(null);

      const { tooltip, setPage } = getPagedOrSingleTooltipTemplate(groupedShopList, navigate);
      customOverlay.setContent(tooltip);

      let isClicked = false;
      kakaoUtils.addListener(marker, 'click', () => {
        const nextMarkerState = {
          marker,
          name: shopNameList,
          isClicked: !isClicked,
          setPage,
        };

        const currentMarkerImage = isClicked ? markerImage : activeMarkerImage;
        const overlayMap = isClicked ? null : kakaoUtils.kakaoInstance;

        marker.setImage(currentMarkerImage);
        customOverlay.setMap(overlayMap);

        changeClickState(nextMarkerState);
        isClicked = !isClicked;
      });

      addMarkerToList({
        marker,
        name: shopNameList,
        isClicked,
        setPage,
      });
    });
  } catch (error) {
    console.error(error);
  }
};
