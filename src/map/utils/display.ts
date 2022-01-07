import { getToolTipTemplate } from 'map/overlays/tooltip';
import { KakaoMap } from 'types/index';

import { getLocationByAddress } from './search';

export const displayMarker = async (map: KakaoMap, address: string) => {
  const { kakao } = window;
  const markerPosition = await getLocationByAddress(address);

  const markerSrc = '/assets/marker.svg';
  const activeMarkerSrc = '/assets/activeMarker.svg';
  const imageSize = new kakao.maps.Size(30, 30); // 마커이미지의 크기입니다
  const imageOption = { offset: new kakao.maps.Point(18, 36) };

  const markerImage = new kakao.maps.MarkerImage(markerSrc, imageSize, imageOption);
  const activeMarkerImage = new kakao.maps.MarkerImage(activeMarkerSrc, imageSize, imageOption);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
    clickable: true,
    title: '소품샵 이름',
    zIndex: 1,
  });

  const customOverlay = new kakao.maps.CustomOverlay({
    map,
    position: marker.getPosition(),
  });

  customOverlay.setContent(getToolTipTemplate());
  customOverlay.setMap(null);

  let isClicked = false;
  kakao.maps.event.addListener(marker, 'click', () => {
    if (isClicked) {
      marker.setImage(markerImage);
      customOverlay.setMap(null);
    } else {
      marker.setImage(activeMarkerImage);
      customOverlay.setMap(map);
    }

    isClicked = !isClicked;
  });

  marker.setMap(map);
};
