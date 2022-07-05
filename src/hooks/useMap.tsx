import { useAppDispatch, useAppSelector } from 'app/hook';
import {
  addCurrentMarker,
  MarkerInfo,
  selectCurrentMarkerList,
  setMarkerCilckState,
} from 'features/map/mapSlice';
import { displayMarker, displayMarkerWithArray } from 'map/utils/display';
import { getLocationByAddress, searchAndMoveByAddress } from 'map/utils/search';
import { useRouter } from 'next/router';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { KakaoMap } from 'types/map';
import { Shop } from 'types/shop';

import useMedia from './useMedia';

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
  const router = useRouter();
  const { isMobile, isTablet } = useMedia();
  const isSmallDevice = isMobile || isTablet;
  const [map, setMap] = useState<KakaoMap>(null);
  const currentMarkerList = useAppSelector(selectCurrentMarkerList);
  const dispatch = useAppDispatch();

  const navigate = useCallback((path: string) => {
    router.push(path);
  }, []);

  const displayMarkerByAddress = useCallback(
    async (shopInfo: Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>) => {
      if (map) {
        await displayMarker(map, shopInfo);
      }
    },
    [map],
  );

  const displayMarkerWithOverlay = useCallback(
    async (shopList: Array<Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>>) => {
      const addMarkerToList = (markerInfo: MarkerInfo) => dispatch(addCurrentMarker(markerInfo));
      const changeClickState = (markerInfo: MarkerInfo) =>
        dispatch(setMarkerCilckState(markerInfo));
      if (map) {
        await displayMarkerWithArray(map, shopList, addMarkerToList, changeClickState, navigate);
      }
    },
    [map, dispatch, navigate],
  );

  const moveByAddress = useCallback(
    (address: string, name: string) => {
      if (map) {
        searchAndMoveByAddress(map, address, isSmallDevice, isStaticMarker, name);
        let targetMarkerIndex = -1;
        const targetMarker = currentMarkerList.find((marker) => {
          targetMarkerIndex = marker.name.findIndex((markerName) => markerName === name);
          return targetMarkerIndex >= 0;
        });

        if (targetMarker) {
          const clickedMarkers = currentMarkerList.filter((marker) => marker.isClicked === true);
          clickedMarkers.forEach((marker) => {
            window.kakao.maps.event.trigger(marker.marker, 'click');
          });

          window.kakao.maps.event.trigger(targetMarker.marker, 'click');
          if (targetMarker.setPage && targetMarkerIndex >= 0) {
            targetMarker.setPage(targetMarkerIndex);
          }
        }
      }
    },
    [map, currentMarkerList, isStaticMarker, isSmallDevice],
  );

  useEffect(() => {
    (async () => {
      if (map && initialLocation) {
        searchAndMoveByAddress(map, initialLocation, isSmallDevice, isStaticMarker);
      }
    })();
  }, [map, initialLocation, isStaticMarker, isSmallDevice]);

  useEffect(() => {
    (async () => {
      if (!map && containerRef?.current) {
        const location = await getLocationByAddress(initialLocation || '서울 마포구');
        if (location) {
          setMap(
            new window.kakao.maps.Map(containerRef.current, {
              center: location,
              level: 4,
            }),
          );
        }
      }
    })();
  }, []);

  return { map, displayMarkerByAddress, displayMarkerWithOverlay, moveByAddress };
}

export default useMap;
