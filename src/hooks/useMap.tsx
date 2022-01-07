/* eslint-disable @typescript-eslint/no-explicit-any */

import { displayMarker } from 'map/utils/display';
import { getLocationByAddress } from 'map/utils/search';
import { RefObject, useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

function useMap<T>(containerRef: RefObject<T extends HTMLElement ? T : HTMLElement>) {
  const [map, setMap] = useState();

  const displayMarkerByAddress = async (address: string) => {
    if (map) await displayMarker(map, address);
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

  return { map, displayMarkerByAddress };
}

export default useMap;
