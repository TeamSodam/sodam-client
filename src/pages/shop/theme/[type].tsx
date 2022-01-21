import { wrapper } from 'app/store';
import DropDownFilter from 'components/common/DropDownFilter';
import ShopCard from 'components/common/ShopCard';
import ThemeSelector from 'components/ThemeSelector';
import { shopApi } from 'features/shops/shopApi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { ShopResponse, ShopThemeSortType, ShopThemeType } from 'types/shop';

type ThemePageDataType = {
  [key in ShopThemeType]: {
    [key in ShopThemeSortType]: ShopResponse[];
  };
};
interface ThemePageProps {
  data: ThemePageDataType;
}

const THEME_LIST: ShopThemeType[] = ['아기자기한', '힙한', '모던한', '빈티지'];

const isShopThemeType = (type: string): type is ShopThemeType =>
  THEME_LIST.some((theme) => theme === type);

const parseThemeType = (themeType: string | string[] | undefined) => {
  if (Array.isArray(themeType) || !themeType) return false;
  if (!isShopThemeType(themeType)) return false;

  return themeType;
};

function ThemePage(props: ThemePageProps) {
  const { data } = props;

  const router = useRouter();
  const { type } = router.query;

  const parsedThemeType = parseThemeType(type);

  const [currentSortType, setCurrentSortType] = useState<ShopThemeSortType>('popular');

  const filterProps = [
    { filterName: '리뷰 많은 순', onClick: () => setCurrentSortType('review') },
    { filterName: '저장 많은 순', onClick: () => setCurrentSortType('popular') },
  ];

  const showCurrentThemeList = () => {
    if (!parsedThemeType) return;
    return data[parsedThemeType][currentSortType].map((shop) => (
      <ShopCard key={shop.shopId} cardData={shop} />
    ));
  };

  return (
    <Container>
      <Wrapper>
        <ThemeWrapper>
          <ThemeSelector />
        </ThemeWrapper>
      </Wrapper>
      <Delimiter />
      <DropDownWrapper>
        <DropDownFilter pageType="theme" filterProps={filterProps} />
      </DropDownWrapper>
      <ShopList>{showCurrentThemeList()}</ShopList>
    </Container>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;
  let resultData: ThemePageDataType = {
    힙한: {
      popular: [],
      review: [],
    },
    아기자기한: {
      popular: [],
      review: [],
    },
    모던한: {
      popular: [],
      review: [],
    },
    빈티지: {
      popular: [],
      review: [],
    },
  };
  const SORT_TYPE: ShopThemeSortType[] = ['popular', 'review'];

  for (const theme of THEME_LIST) {
    const promiseList = SORT_TYPE.map((sortType) =>
      dispatch(
        shopApi.endpoints.getShopByTheme.initiate({
          theme,
          sortType,
          offset: 1,
          limit: 16,
        }),
      ),
    );

    const result = await Promise.all(promiseList);
    result.forEach((eachResult, idx) => {
      resultData = {
        ...resultData,
        [theme]: {
          ...resultData[theme],
          [SORT_TYPE[idx]]: eachResult?.data || [],
        },
      };
    });
  }

  return {
    props: {
      data: resultData,
    },
  };
});

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 7.2rem 18.75% 0 18.75%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const ThemeWrapper = styled.div`
  width: 100%;
  display: flex;
  height: calc(50.8rem - 7.2rem);
`;

const Delimiter = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.colors.navLine};
  padding: 0;
  margin: 0;
`;

const ShopList = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem 2.4rem;

  margin-bottom: 8.1rem;
`;

const DropDownWrapper = styled.div`
  padding-right: 18.75%;
  margin-left: auto;
  margin: 4rem 0 2.4rem auto;
`;

export default ThemePage;
