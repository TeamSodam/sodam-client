import type { PayloadAction } from '@reduxjs/toolkit';
import { MarkerInfo } from 'features/map/mapSlice';
import { getMiniToolTipTemplate } from 'map/overlays/miniTooltip';
import { getPagedToolTipTemplate, getToolTipTemplate } from 'map/overlays/tooltip';
import shortid from 'shortid';
import { KakaoLatLng, KakaoMap } from 'types/map';
import { Shop } from 'types/shop';

import { getLocationByAddress } from './search';

export const displayMarker = async (
  map: KakaoMap,
  shopInfo: Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>,
) => {
  const { kakao } = window;
  const { landAddress, shopName } = shopInfo;
  try {
    const markerPosition = await getLocationByAddress(landAddress, shopName);

    const MARKER_SRC = '/assets/ic_basic_marker.svg';
    const imageSize = new kakao.maps.Size(32, 38);
    const imageOption = { offset: new kakao.maps.Point(18, 36) };

    const markerImage = new kakao.maps.MarkerImage(MARKER_SRC, imageSize, imageOption);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      clickable: true,
      title: shopName,
    });

    const customOverlay = new kakao.maps.CustomOverlay({
      map,
      position: marker.getPosition(),
    });

    customOverlay.setContent(getMiniToolTipTemplate(shopInfo));
    map.setLevel(1);
    marker.setMap(map);
  } catch (error) {
    console.error(`${shopName}의 주소를 나타내는데 실패했어요. ${error}`);
  }
};

export const displayMarkerWithArray = async (
  map: KakaoMap,
  shopList: Array<Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>>,
  addMarkerToList: (markerInfo: MarkerInfo) => PayloadAction<MarkerInfo>,
  changeClickState: (markerInfo: MarkerInfo) => PayloadAction<MarkerInfo>,
  navigate: (path: string) => void,
) => {
  const { kakao } = window;
  try {
    const MARKER_SRC = '/assets/ic_basic_marker.svg';
    const ACTIVE_MARKER_SRC = '/assets/ic_active_marker.svg';
    const imageSize = new kakao.maps.Size(32, 38);
    const imageOption = { offset: new kakao.maps.Point(18, 36) };

    const markerImage = new kakao.maps.MarkerImage(MARKER_SRC, imageSize, imageOption);
    const activeMarkerImage = new kakao.maps.MarkerImage(ACTIVE_MARKER_SRC, imageSize, imageOption);

    const shopListWithMarkerPosition = await Promise.all(
      shopList.map(async ({ landAddress, shopName, ...rest }) => ({
        ...rest,
        landAddress,
        shopName,
        latlng: await getLocationByAddress(landAddress, shopName),
      })),
    );

    /**
     * 동일한 좌표를 갖는 소품샵들을 배열로 그룹화하는 작업.
     * 작업의 편의를 위해 동일한 좌표가 없는 소품샵도 길이가 1인 배열로 표현.
     */
    const grouped = new Array(shopListWithMarkerPosition.length).fill(false);
    const groupedShopListByMarkerPosition: Array<
      Array<
        Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'> & {
          latlng: KakaoLatLng | null;
        }
      >
    > = [];

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

    /**
     * 하나의 마커에 그룹화된 소품샵들을 오버레이에 올림.
     */
    groupedShopListByMarkerPosition.forEach((groupedShopList) => {
      if (!groupedShopList.length) return;
      const shopNameList = groupedShopList.map(({ shopName }) => shopName);
      const { latlng } = groupedShopList[0];
      const marker = new kakao.maps.Marker({
        position: latlng,
        image: markerImage,
        clickable: true,
        title: 'group' + shortid(),
      });

      const customOverlay = new kakao.maps.CustomOverlay({
        map,
        position: latlng,
      });

      marker.setMap(map);
      customOverlay.setMap(null);
      const { tooltip, setPage } = getPagedToolTipTemplate(groupedShopList, navigate);
      if (groupedShopList.length === 1) {
        customOverlay.setContent(getToolTipTemplate(groupedShopList[0], navigate));
      } else {
        customOverlay.setContent(tooltip);
      }

      let isClicked = false;
      kakao.maps.event.addListener(marker, 'click', () => {
        const nextMarkerState = {
          marker,
          name: shopNameList,
          isClicked: !isClicked,
          setPage: groupedShopList.length === 1 ? null : setPage,
        };
        if (isClicked) {
          marker.setImage(markerImage);
          customOverlay.setMap(null);
        } else {
          marker.setImage(activeMarkerImage);
          customOverlay.setMap(map);
        }

        changeClickState(nextMarkerState);
        isClicked = !isClicked;
      });

      addMarkerToList({
        marker,
        name: shopNameList,
        isClicked,
        setPage: groupedShopList.length === 1 ? null : setPage,
      });
    });
  } catch (error) {
    console.error(error);
  }
};
