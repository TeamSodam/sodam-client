import { displayMarker } from 'map/utils/display';
import { getLocationByAddress, searchAndMoveByAddress } from 'map/utils/search';
import { RefObject, useEffect, useState } from 'react';
import { KakaoMap } from 'types/map';

declare global {
  interface Window {
    kakao: KakaoMap;
  }
}

function useMap<T>(containerRef: RefObject<T extends HTMLElement ? T : HTMLElement>) {
  const [map, setMap] = useState();

  const displayMarkerByAddress = async (address: string) => {
    if (map) await displayMarker(map, address);
  };

  const moveByAddress = (address: string) => {
    if (map) searchAndMoveByAddress(map, address);
  };

  useEffect(() => {
    async function initMap() {
      if (containerRef.current) {
        const defaultLocation = await getLocationByAddress('서울 서초구 방배천로18길 28');
        if (!map)
          setMap(new window.kakao.maps.Map(containerRef.current, { center: defaultLocation }));
      }
    }
    initMap();
  }, [containerRef, map]);

  return { map, displayMarkerByAddress, moveByAddress };
}

export default useMap;
