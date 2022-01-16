export interface ShopElementProps {
  shopId: number;
  shopName: string;
  category: string[];
  image: string;
  address: string;
  close: string;
  reviewCount: number;
}

export const dummyShopList: ShopElementProps[] = [
  {
    shopId: 2,
    shopName: '수바코',
    category: ['문구.팬시'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 희우정로20길 66 상가1층2호',
    close: '영업시간 12:00~17:00',
    reviewCount: 42,
  },
  {
    shopId: 3,
    shopName: '프레젠트모먼트',
    category: ['인테리어소품'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 동교로 49-1 1층',
    close: '영업시간 12:00~17:00',
    reviewCount: 54,
  },
  {
    shopId: 4,
    shopName: '무드',
    category: ['인테리어소품', '캔들'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 포은로8길 16',
    close: '영업시간 12:00~17:00',
    reviewCount: 10,
  },
  {
    shopId: 5,
    shopName: '제로스페이스',
    category: ['문구.팬시'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 희우정로16길 32',
    close: '영업시간 12:00~17:00',
    reviewCount: 189,
  },
  {
    shopId: 6,
    shopName: '브라와',
    category: ['문구.팬시'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 희우정로10길 30 1층',
    close: '영업시간 12:00~17:00',
    reviewCount: 200,
  },
  {
    shopId: 7,
    shopName: '망원만물',
    category: ['인테리어소품'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 동교로 35 왼쪽가게',
    close: '영업시간 12:00~17:00',
    reviewCount: 200,
  },
];
