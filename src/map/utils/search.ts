import { latlngList } from 'map/data/latlng';
import { KakaoLatLng, KakaoMap, StatusText, xy } from 'types/map';

// address: 서울 서초구 방배천로18길 28 (실제주소) 반환 값: LatLng 객체
export const getLocationByAddress = async (
  address: string,
  shopName?: string,
): Promise<KakaoLatLng | null> => {
  const geocoder = new window.kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, function (result: xy[], status: StatusText) {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(new window.kakao.maps.LatLng(result[0].y, result[0].x));
      } else {
        if (shopName && shopName in latlngList) {
          resolve(new window.kakao.maps.LatLng(latlngList[shopName].y, latlngList[shopName].x));
        } else reject(Error(`${address} 에 대한 검색에 실패했어요.`));
      }
    });
  });
};

// address 에 해당하는 위치로 지도의 중심을 이동함.
export const searchAndMoveByAddress = (
  map: KakaoMap,
  address: string,
  isSmallDevice: boolean,
  isStaticMarker?: boolean,
  shopName?: string,
) => {
  const geocoder = new window.kakao.maps.services.Geocoder();
  geocoder.addressSearch(address, function (result: xy[], status: StatusText) {
    let coords = null;
    if (status === window.kakao.maps.services.Status.OK) {
      coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
    } else if (shopName && shopName in latlngList) {
      coords = new window.kakao.maps.LatLng(latlngList[shopName].y, latlngList[shopName].x);
    } else {
      const splitAddress = address.split(' ');
      const maybeShopname = splitAddress[splitAddress.length - 1];
      if (maybeShopname in latlngList) {
        coords = new window.kakao.maps.LatLng(
          latlngList[maybeShopname].y,
          latlngList[maybeShopname].x,
        );
      }
    }
    if (coords) {
      map.setCenter(coords);
      if (!isStaticMarker && !isSmallDevice) map.panBy(-150, 0);
    }
  });
};
