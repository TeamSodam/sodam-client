import { useAppDispatch } from 'app/hook';
import { wrapper } from 'app/store';
import LocalShopInfo, { OptionLabel } from 'components/LocalShopInfo';
import SEOUL_ENUM from 'constants/SeoulAreaEnum';
import { initMap } from 'features/map/mapSlice';
import { useGetShopByAreaQuery } from 'features/shops/shopApi';
import useMap from 'hooks/useMap';
import { useRouter } from 'next/router';
import LeftArr from 'public/assets/ic_leftArr.svg';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import Screen from 'styles/Screen';
import { ShopAreaSortType } from 'types/shop';

const parseAreaId = (areaId: string | string[] | undefined) => {
  if (!areaId) return 0;
  if (Array.isArray(areaId)) return +areaId.join('');

  return +areaId;
};

type OptionMapper = {
  [key in OptionLabel]: ShopAreaSortType;
};

const OPTION_MAPPER: OptionMapper = {
  '인기 순': 'popular',
  '내가 저장한': 'mysave',
};

function MapWithAreaId(props: { areaId: number }) {
  const { areaId: AREA_ID } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentOption, setCurrentOption] = useState<OptionLabel>('인기 순');
  const { data: currentList } = useGetShopByAreaQuery({
    area: SEOUL_ENUM[AREA_ID],
    sort: OPTION_MAPPER[currentOption],
  });

  const toggleOption = (option: OptionLabel) => setCurrentOption(option);

  const mapRef = useRef<HTMLDivElement>(null);

  const initialLocation = currentList && currentList.length > 0 && currentList[0].landAddress;

  const { displayMarkerByAddress } = useMap(mapRef, initialLocation || SEOUL_ENUM[AREA_ID]);
  const onClickGoBack = () => {
    dispatch(initMap());
    router.push('/map');
  };

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
          <Screen tablet desktop wide>
            <LocalShopInfo
              shopList={currentList}
              currentOption={currentOption}
              toggleOption={toggleOption}
            />
          </Screen>
        )}
      </MapContainer>
      {currentList && (
        <Screen mobile>
          <LocalShopInfo
            shopList={currentList}
            currentOption={currentOption}
            toggleOption={toggleOption}
          />
        </Screen>
      )}
    </StyledContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async (context) => {
  const AREA_ID = parseAreaId(context.params?.areaId);
  return {
    props: {
      areaId: AREA_ID,
    },
  };
});

const StyledContainer = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 7.2rem;

  ${applyMediaQuery('desktop')} {
    margin-top: 5.2rem;
  }

  ${applyMediaQuery('mobile')} {
    margin-top: 2.1rem;
  }
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

  ${applyMediaQuery('mobile')} {
    gap: 0.9rem;
    & > span {
      font-size: 1rem;
      line-height: 1.4rem;
    }

    & > svg {
      transform: scale(0.5) translateY(12.5%);
    }
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

  ${applyMediaQuery('desktop')} {
    height: 55rem;
    margin: 3.5rem 0 10rem 0;
  }

  ${applyMediaQuery('mobile')} {
    height: 29rem;
    margin: 1.1rem 0 0 0;
  }

  position: relative;
`;

export default MapWithAreaId;
