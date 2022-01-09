import { displayMarker } from 'map/utils/display';
import { getLocationByAddress, searchAndMoveByAddress } from 'map/utils/search';
import { RefObject, useEffect, useState } from 'react';
import { KakaoMap, ShopInfoInMarker } from 'types/map';

declare global {
  interface Window {
    kakao: KakaoMap;
  }
}

const dummyShopInfo = {
  address: '서울 서초구 방배중앙로29길 7',
  name: '이티비티샵',
  category: '패션소품',
};

function useMap<T>(containerRef: RefObject<T extends HTMLElement ? T : HTMLElement>) {
  const [map, setMap] = useState();

  const displayMarkerByAddress = async (shopInfo: ShopInfoInMarker = dummyShopInfo) => {
    if (map) await displayMarker(map, shopInfo);
  };

  const moveByAddress = (address: string) => {
    if (map) searchAndMoveByAddress(map, address);
  };

  useEffect(() => {
    (async () => {
      if (containerRef.current) {
        const defaultLocation = await getLocationByAddress('서울 서초구 방배천로18길 28');
        setMap(new window.kakao.maps.Map(containerRef.current, { center: defaultLocation }));
      }
    })();
  }, [containerRef]);

  return { map, displayMarkerByAddress, moveByAddress };
}

export default useMap;
