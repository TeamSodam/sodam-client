/* eslint-disable @typescript-eslint/no-explicit-any */
interface xy {
  x: string;
  y: string;
}

// address: 서울 서초구 방배천로18길 28 (실제주소) 반환 값: LatLng 객체
export const getLocationByAddress = async (address: string): Promise<any> => {
  const geocoder = new window.kakao.maps.services.Geocoder();

  return await new Promise((resolve) => {
    geocoder.addressSearch(address, function (result: xy[]) {
      resolve(new window.kakao.maps.LatLng(result[0].y, result[0].x));
    });
  });
};
