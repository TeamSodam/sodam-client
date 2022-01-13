/* eslint-disable @typescript-eslint/no-explicit-any */
export type KakaoMap = any;

export interface KakaoMarker {
  getPosition: () => KakaoLatLng;
  setImage: (arg: any) => any;
  setMap: (map: KakaoMap) => any;
}
export interface KakaoLatLng {
  La: string;
  Ma: string;
}

export interface ShopInfoInMarker {
  address: string;
  name: string;
  category: string | string[];
}

export interface xy {
  x: string;
  y: string;
}

export type StatusText = 'OK' | 'ZERO_RESULT' | 'ERROR';
