import type { PayloadAction } from '@reduxjs/toolkit';
import { MarkerInfo } from 'features/map/mapSlice';
import { getToolTipTemplate } from 'map/overlays/tooltip';
import { KakaoMap, ShopInfoInMarker } from 'types/map';

import { getLocationByAddress } from './search';

export const displayMarker = async (
  map: KakaoMap,
  shopInfo: ShopInfoInMarker,
  addMarkerToList: (markerInfo: MarkerInfo) => PayloadAction<MarkerInfo>,
  changeClickState: (markerInfo: MarkerInfo) => PayloadAction<MarkerInfo>,
) => {
  const { kakao } = window;
  const { address, name } = shopInfo;
  const markerPosition = await getLocationByAddress(address);

  const MARKER_SRC = '/assets/ic_basic_marker.svg';
  const ACTIVE_MARKER_SRC = '/assets/ic_active_marker.svg';
  const imageSize = new kakao.maps.Size(32, 38);
  const imageOption = { offset: new kakao.maps.Point(18, 36) };

  const markerImage = new kakao.maps.MarkerImage(MARKER_SRC, imageSize, imageOption);
  const activeMarkerImage = new kakao.maps.MarkerImage(ACTIVE_MARKER_SRC, imageSize, imageOption);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
    clickable: true,
    title: name,
    zIndex: 1,
  });

  const customOverlay = new kakao.maps.CustomOverlay({
    map,
    position: marker.getPosition(),
  });

  customOverlay.setContent(getToolTipTemplate(shopInfo));
  customOverlay.setMap(null);

  let isClicked = false;
  kakao.maps.event.addListener(marker, 'click', () => {
    const nextMarkerState = {
      marker,
      name,
      isClicked: !isClicked,
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
    name,
    isClicked,
  });
  marker.setMap(map);
};
