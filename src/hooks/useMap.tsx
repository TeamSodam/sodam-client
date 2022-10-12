import { useAppDispatch, useAppSelector } from 'app/hook';
import {
  addCurrentMarker,
  MarkerInfo,
  selectCurrentMarkerList,
  setMarkerCilckState,
} from 'features/map/mapSlice';
import KakaoUtils from 'map/utils';
import { displayDynamicMarkers, displayStaticMarker } from 'map/utils/display';
import { useRouter } from 'next/router';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { KakaoMap } from 'types/map';
import { Shop } from 'types/shop';

import useMedia from './useMedia';
import useOnceChangeEffect from './useOnceChangeEffect';

declare global {
  interface Window {
    kakao: KakaoMap;
  }
}

interface UseMapHookProps<T> {
  containerRef?: RefObject<T extends HTMLElement ? T : HTMLElement>;
  initialLocationInfo?: {
    address: string;
    shopName?: string;
  };
  isStaticMarker?: boolean;
}

function useMap<T>(props: UseMapHookProps<T>) {
  const { containerRef, initialLocationInfo, isStaticMarker } = props;
  const router = useRouter();
  const { isMobile, isTablet } = useMedia();
  const isSmallDevice = isMobile || isTablet;
  const [mapError, setMapError] = useState('');
  const currentMarkerList = useAppSelector(selectCurrentMarkerList);
  const dispatch = useAppDispatch();

  const kakaoUtils = useRef<KakaoUtils>();

  const navigate = useCallback((path: string) => {
    router.push(path);
  }, []);

  const searchAndMoveByAddress = useCallback(
    async (locationInfo: typeof initialLocationInfo) => {
      setMapError('');
      if (kakaoUtils.current?.isMapExist() && locationInfo) {
        try {
          const coords = await kakaoUtils.current.getLocationByAddress(locationInfo);
          if (coords) {
            kakaoUtils.current.setCenter(coords);
            if (!isStaticMarker && !isSmallDevice) kakaoUtils.current.panBy([-150, 0]);
          }
        } catch (error) {
          if (error instanceof Error) {
            setMapError(error.message);
            return;
          }
          setMapError('알 수 없는 오류가 발생했어요.');
        }
      }
    },
    [isSmallDevice, isStaticMarker],
  );

  const displayMarkerByAddress = useCallback(
    async (shopInfo: Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>) => {
      if (kakaoUtils.current?.isMapExist()) await displayStaticMarker(kakaoUtils.current, shopInfo);
    },
    [],
  );

  const displayMarkerWithOverlay = useCallback(
    async (shopList: Array<Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>>) => {
      const addMarkerToList = (markerInfo: MarkerInfo) => dispatch(addCurrentMarker(markerInfo));
      const changeClickState = (markerInfo: MarkerInfo) =>
        dispatch(setMarkerCilckState(markerInfo));
      if (kakaoUtils.current?.isMapExist()) {
        await displayDynamicMarkers(
          kakaoUtils.current,
          shopList,
          addMarkerToList,
          changeClickState,
          navigate,
        );
      }
    },
    [dispatch, navigate],
  );

  const moveByAddress = useCallback(
    (address: string, name: string) => {
      if (!kakaoUtils.current || !kakaoUtils.current?.isMapExist()) return false;
      searchAndMoveByAddress({ address, shopName: name });
      let targetMarkerIndex = -1;
      const targetMarker = currentMarkerList.find((marker) => {
        targetMarkerIndex = marker.name.findIndex((markerName) => markerName === name);
        return targetMarkerIndex >= 0;
      });

      if (!targetMarker) return false;
      const clickedMarkers = currentMarkerList.filter((marker) => marker.isClicked);
      clickedMarkers.forEach((marker) => {
        kakaoUtils.current?.triggerEvent(marker.marker, 'click');
      });

      kakaoUtils.current.triggerEvent(targetMarker.marker, 'click');
      if (targetMarker.setPage && targetMarkerIndex >= 0) {
        targetMarker.setPage(targetMarkerIndex);
      }

      return true;
    },
    [currentMarkerList, searchAndMoveByAddress],
  );

  const initialize = async () => {
    if (window.kakao && containerRef?.current) {
      kakaoUtils.current = new KakaoUtils(window.kakao, containerRef);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useOnceChangeEffect(() => {
    if (!isStaticMarker) searchAndMoveByAddress(initialLocationInfo);
  }, initialLocationInfo);

  useEffect(() => {
    if (isStaticMarker) searchAndMoveByAddress(initialLocationInfo);
  }, [initialLocationInfo, searchAndMoveByAddress, isStaticMarker]);

  useEffect(
    () => () => {
      if (kakaoUtils.current) {
        kakaoUtils.current = undefined;
      }
    },
    [],
  );

  return { displayMarkerByAddress, displayMarkerWithOverlay, moveByAddress, initialize, mapError };
}

export default useMap;
