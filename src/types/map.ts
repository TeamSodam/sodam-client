/* eslint-disable @typescript-eslint/no-explicit-any */
export type KakaoMap = any;

export interface KakaoMarker {
  getPosition: () => KakaoLatLng;
  setImage: (arg: any) => void;
  setMap: (map: KakaoMap) => void;
}
export interface KakaoLatLng {
  La: string;
  Ma: string;
  equals: (latlng: KakaoLatLng) => boolean;
}

export interface ShopInfoInMarker {
  address: string;
  name: string;
  category: string | string[];
}

export interface xy {
  x: number;
  y: number;
}

export type StatusText = 'OK' | 'ZERO_RESULT' | 'ERROR';
