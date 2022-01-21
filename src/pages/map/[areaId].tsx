import { useAppDispatch } from 'app/hook';
import { wrapper } from 'app/store';
import MapSidebar, { OptionLabel } from 'components/MapSidebar';
import SEOUL_ENUM from 'constants/SeoulAreaEnum';
import { initMap } from 'features/map/mapSlice';
import { shopApi } from 'features/shops/shopApi';
import useMap from 'hooks/useMap';
import { useRouter } from 'next/router';
import LeftArr from 'public/assets/ic_leftArr.svg';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ShopAreaResponse } from 'types/shop';

interface AreaMapProps {
  popularAreaList: ShopAreaResponse[];
  saveAreaList: ShopAreaResponse[];
  areaId: number;
}

const parseAreaId = (areaId: string | string[] | undefined) => {
  if (!areaId) return 0;
  if (Array.isArray(areaId)) return +areaId.join('');

  return +areaId;
};

function MapWithAreaId(props: AreaMapProps) {
  const { popularAreaList, saveAreaList, areaId: AREA_ID } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [currentList, setCurrentList] = useState(popularAreaList);
  const [currentOption, setCurrentOption] = useState<OptionLabel>('인기 순');

  const toggleOption = (option: OptionLabel) => setCurrentOption(option);

  const mapRef = useRef<HTMLDivElement>(null);

  const initialLocation = currentList && currentList.length > 0 && currentList[0].landAddress;

  const { displayMarkerByAddress } = useMap(mapRef, initialLocation || SEOUL_ENUM[AREA_ID]);
  const onClickGoBack = () => {
    dispatch(initMap());
    router.push('/map');
  };

  useEffect(() => {
    if (currentOption === '인기 순') {
      setCurrentList(popularAreaList);
    } else setCurrentList(saveAreaList);
  }, [currentOption, popularAreaList, saveAreaList]);

  useEffect(() => {
    if (currentList) {
      (() => {
        currentList.forEach(async (shopInfo) => {
          const { category, landAddress, shopName, shopId } = shopInfo;
          await displayMarkerByAddress({ landAddress, shopName, category, shopId });
        });
      })();
    }
  }, [displayMarkerByAddress, currentList]);

  return (
    <StyledContainer>
      <StyledGoBack onClick={onClickGoBack}>
        <LeftArrIC />
        <span>지역 다시 선택하기</span>
      </StyledGoBack>
      <MapContainer ref={mapRef}>
        {currentList && (
          <MapSidebar
            shopList={currentList}
            currentOption={currentOption}
            toggleOption={toggleOption}
          />
        )}
      </MapContainer>
    </StyledContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  if (!context.params) {
    return {
      props: {
        popularAreaList: [],
        saveAreaList: [],
        areaId: 1,
      },
    };
  }

  const AREA_ID = parseAreaId(context.params.areaId);
  const dispatch = store.dispatch;

  const popularResult = await dispatch(
    shopApi.endpoints.getShopByArea.initiate({
      area: SEOUL_ENUM[AREA_ID],
      sort: 'popular',
    }),
  );
  const mySaveResult = await dispatch(
    shopApi.endpoints.getShopByArea.initiate({
      area: SEOUL_ENUM[AREA_ID],
      sort: 'mysave',
    }),
  );

  return {
    props: {
      areaId: AREA_ID,
      popularAreaList: popularResult.data || [],
      saveAreaList: mySaveResult.data || [],
    },
  };
});

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
