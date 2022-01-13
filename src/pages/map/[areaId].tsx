import { useAppDispatch } from 'app/hook';
import MapSidebar from 'components/MapSidebar';
import SEOUL_ENUM from 'constants/SeoulAreaEnum';
import { initMap } from 'features/map/mapSlice';
import { useGetShopByAreaQuery } from 'features/shops/shopApi';
import useMap from 'hooks/useMap';
import { useRouter } from 'next/router';
import LeftArr from 'public/assets/ic_leftArr.svg';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const parseAreaId = (areaId: string | string[] | undefined) => {
  if (!areaId) return 0;
  if (Array.isArray(areaId)) return +areaId.join('');

  return +areaId;
};

function MapWithAreaId() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { areaId } = router.query;
  const AREA_ID = parseAreaId(areaId);

  const mapRef = useRef<HTMLDivElement>(null);
  const { data: areaShopList } = useGetShopByAreaQuery(SEOUL_ENUM[AREA_ID]);
  const initialLocation = areaShopList && areaShopList.length > 0 && areaShopList[0].roadAddress;
  const { displayMarkerByAddress } = useMap(mapRef, initialLocation || SEOUL_ENUM[AREA_ID]);
  const onClickGoBack = () => {
    dispatch(initMap());
    router.push('/map');
  };

  useEffect(() => {
    if (areaShopList) {
      (() => {
        areaShopList.forEach(async (shopInfo) => {
          const { category, roadAddress, store } = shopInfo;
          await displayMarkerByAddress({ address: roadAddress, name: store, category });
        });
      })();
    }
  }, [displayMarkerByAddress, areaShopList]);

  if (!areaId) return <div>something wrong!</div>;

  return (
    <StyledContainer>
      <StyledGoBack onClick={onClickGoBack}>
        <LeftArrIC />
        <span>지역 다시 선택하기</span>
      </StyledGoBack>
      <MapContainer ref={mapRef}>
        {areaShopList && <MapSidebar shopList={areaShopList} />}
      </MapContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 18.75% 0 18.75%;
`;

const StyledGoBack = styled.button`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 2.2rem;

  background-color: transparent;
  border: none;
  & > span {
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.black2};
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const LeftArrIC = styled(LeftArr)`
  height: 2rem;
  fill: ${({ theme }) => theme.colors.black2};
`;

const MapContainer = styled.div`
  width: 100%;
  height: 82.4rem;

  margin: 3.5rem 0 13.2rem 0;

  position: relative;
`;

export default MapWithAreaId;
