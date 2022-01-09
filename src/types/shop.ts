export interface Shop {
  id: number;
  thumbnail: string;
  name: string;
  categoryList: string[];
  theme: string;
  station: string;
  tel: string;
  addressRoad: string; // 도로명
  addressLand: string; // 지번
  hour: string;
  website?: string;
  sns?: string;
}

export interface ShopCardData extends Pick<Shop, 'id' | 'thumbnail' | 'name' | 'categoryList'> {
  rank?: number;
}
