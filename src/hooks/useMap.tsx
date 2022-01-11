import { useAppDispatch, useAppSelector } from 'app/hook';
import { selectMap, setMap } from 'features/map/mapSlice';
import { displayMarker } from 'map/utils/display';
import { getLocationByAddress, searchAndMoveByAddress } from 'map/utils/search';
import { RefObject, useEffect } from 'react';
import { KakaoMap, ShopInfoInMarker } from 'types/map';

declare global {
  interface Window {
    kakao: KakaoMap;
  }
}

function useMap<T>(containerRef?: RefObject<T extends HTMLElement ? T : HTMLElement>) {
  const map = useAppSelector(selectMap);
  const dispatch = useAppDispatch();

  const displayMarkerByAddress = async (shopInfo: ShopInfoInMarker) => {
    if (map) await displayMarker(map, shopInfo);
  };

  const moveByAddress = (address: string) => {
    if (map) searchAndMoveByAddress(map, address);
  };

  useEffect(() => {
    (async () => {
      if (containerRef?.current) {
        const defaultLocation = await getLocationByAddress('서울 마포구 희우정로16길 32');
        if (!map)
          dispatch(
            setMap(new window.kakao.maps.Map(containerRef.current, { center: defaultLocation })),
          );
      }
    })();
  }, [containerRef, dispatch, map]);

  return { map, displayMarkerByAddress, moveByAddress };
}

export default useMap;
