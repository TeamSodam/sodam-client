import { useAppDispatch, useAppSelector } from 'app/hook';
import {
  addCurrentMarker,
  MarkerInfo,
  selectCurrentMarkerList,
  selectMap,
  setMap,
  setMarkerCilckState,
} from 'features/map/mapSlice';
import { displayMarker } from 'map/utils/display';
import { getLocationByAddress, searchAndMoveByAddress } from 'map/utils/search';
import { RefObject, useCallback, useEffect } from 'react';
import { KakaoMap } from 'types/map';
import { Shop } from 'types/shop';

declare global {
  interface Window {
    kakao: KakaoMap;
  }
}

function useMap<T>(
  containerRef?: RefObject<T extends HTMLElement ? T : HTMLElement>,
  initialLocation?: string,
  isStaticMarker?: boolean,
) {
  const map = useAppSelector(selectMap);
  const currentMarkerList = useAppSelector(selectCurrentMarkerList);
  const dispatch = useAppDispatch();

  const displayMarkerByAddress = useCallback(
    async (shopInfo: Pick<Shop, 'store' | 'category' | 'landAddress' | 'shopId'>) => {
      const addMarkerToList = (markerInfo: MarkerInfo) => dispatch(addCurrentMarker(markerInfo));
      const changeClickState = (markerInfo: MarkerInfo) =>
        dispatch(setMarkerCilckState(markerInfo));

      if (map)
        await displayMarker(map, shopInfo, addMarkerToList, changeClickState, isStaticMarker);
    },
    [map, dispatch, isStaticMarker],
  );

  const moveByAddress = useCallback(
    (address: string, name: string) => {
      if (map) {
        searchAndMoveByAddress(map, address, isStaticMarker);
        const targetMarker = currentMarkerList.find((marker) => marker.name === name);
        if (targetMarker) {
          const clickedMarkers = currentMarkerList.filter((marker) => marker.isClicked === true);
          clickedMarkers.forEach((marker) => {
            window.kakao.maps.event.trigger(marker.marker, 'click');
          });

          window.kakao.maps.event.trigger(targetMarker.marker, 'click');
        }
      }
    },
    [map, currentMarkerList, isStaticMarker],
  );

  useEffect(() => {
    (async () => {
      if (containerRef?.current) {
        if (!map) {
          const location = await getLocationByAddress(`${initialLocation || '서울 마포구'}`);
          dispatch(
            setMap(
              new window.kakao.maps.Map(containerRef.current, {
                center: location,
                level: 4,
              }),
            ),
          );
        }
      }
    })();

    if (map && initialLocation) {
      searchAndMoveByAddress(map, initialLocation, isStaticMarker);
    }
  }, [containerRef, dispatch, map, initialLocation, isStaticMarker]);

  return { map, displayMarkerByAddress, moveByAddress };
}

export default useMap;
