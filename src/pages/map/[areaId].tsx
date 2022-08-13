import { useAppDispatch, useAppSelector } from 'app/hook';
import { wrapper } from 'app/store';
import LocalShopInfo, { OptionLabel } from 'components/LocalShopInfo';
import SEOUL_ENUM from 'constants/SeoulAreaEnum';
import { initMap } from 'features/map/mapSlice';
import { useGetShopByAreaQuery } from 'features/shops/shopApi';
import { selectIsLogin } from 'features/users/userSlice';
import useMap from 'hooks/useMap';
import Head from 'next/head';
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

  const isLogin = useAppSelector(selectIsLogin);

  const [isLoading, setIsLoading] = useState(false);
  const [currentOption, setCurrentOption] = useState<OptionLabel>('인기 순');
  const { data: currentList } = useGetShopByAreaQuery(
    {
      area: SEOUL_ENUM[AREA_ID],
      sort: OPTION_MAPPER[currentOption],
    },
    {
      skip: !isLogin && currentOption === '내가 저장한',
    },
  );

  const toggleOption = (option: OptionLabel) => setCurrentOption(option);

  const mapRef = useRef<HTMLDivElement>(null);

  const initialLocation = currentList && currentList.length > 0 && currentList[0].landAddress;

  const { displayMarkerByAddress, displayMarkerWithOverlay, moveByAddress } = useMap(
    mapRef,
    initialLocation || SEOUL_ENUM[AREA_ID],
  );
  const onClickGoBack = () => {
    dispatch(initMap());
    router.push('/map');
  };

  useEffect(() => {
    if (currentList) {
      (async () => {
        setIsLoading(true);
        await displayMarkerWithOverlay(currentList);
        setIsLoading(false);
      })();
    }
  }, [displayMarkerByAddress, displayMarkerWithOverlay, currentList]);

  return (
    <StyledContainer>
      <Head>
        <meta property="og:title" content={'소담 :: 소품샵 지도'} />
        <title>소담 :: 소품샵 지도</title>
      </Head>
      <StyledGoBack onClick={onClickGoBack}>
        <LeftArrIC />
        <span>지역 다시 선택하기</span>
      </StyledGoBack>
      <MapContainer ref={mapRef}>
        <Screen desktop wide>
          <LocalShopInfo
            isLoading={isLoading}
            shopList={!isLogin && currentOption === '내가 저장한' ? [] : currentList || []}
            currentOption={currentOption}
            toggleOption={toggleOption}
            moveByAddress={moveByAddress}
          />
        </Screen>
      </MapContainer>
      <Screen mobile tablet>
        <LocalShopInfo
          isLoading={isLoading}
          shopList={!isLogin && currentOption === '내가 저장한' ? [] : currentList || []}
          currentOption={currentOption}
          toggleOption={toggleOption}
          moveByAddress={moveByAddress}
        />
      </Screen>
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
    padding-bottom: 6.3rem;
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
  padding: 0;
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

  ${applyMediaQuery('tablet')} {
    height: 36rem;
    margin: 1.1rem 0 0 0;
  }

  ${applyMediaQuery('mobile')} {
    height: 29rem;
    margin: 1.1rem 0 0 0;

    & img[title] {
      transform: scale(0.7);
    }
  }

  position: relative;
`;

export default MapWithAreaId;
