import { KakaoLatLng, KakaoMap, StatusText, xy } from 'types/map';

// address: 서울 서초구 방배천로18길 28 (실제주소) 반환 값: LatLng 객체
export const getLocationByAddress = async (address: string): Promise<KakaoLatLng | null> => {
  const geocoder = new window.kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, function (result: xy[], status: StatusText) {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(new window.kakao.maps.LatLng(result[0].y, result[0].x));
      } else reject(Error(`${address} 에 대한 검색에 실패했어요.`));
    });
  });
};

// address 에 해당하는 위치로 지도의 중심을 이동함.
export const searchAndMoveByAddress = (
  map: KakaoMap,
  address: string,
  isStaticMarker?: boolean,
) => {
  const geocoder = new window.kakao.maps.services.Geocoder();
  geocoder.addressSearch(address, function (result: xy[], status: StatusText) {
    if (status === window.kakao.maps.services.Status.OK) {
      const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
      map.setCenter(coords);
      if (!isStaticMarker) map.panBy(-200, 0);
    }
  });
};
