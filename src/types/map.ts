// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KakaoMap = any;

export interface KakaoLatLng {
  La: string;
  Ma: string;
}

export interface ShopInfoInMarker {
  address: string;
  name: string;
  category: string;
}

export interface xy {
  x: string;
  y: string;
}

export type StatusText = 'OK' | 'ZERO_RESULT' | 'ERROR';
