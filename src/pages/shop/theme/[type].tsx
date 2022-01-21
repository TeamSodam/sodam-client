import DropDownFilter from 'components/common/DropDownFilter';
import ShopCard from 'components/common/ShopCard';
import ThemeSelector from 'components/ThemeSelector';
import { useGetShopByThemeQuery } from 'features/shops/shopApi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { ShopThemeSortType, ShopThemeType } from 'types/shop';

const THEME_LIST: ShopThemeType[] = ['아기자기한', '힙한', '모던한', '빈티지'];

const isShopThemeType = (type: string): type is ShopThemeType =>
  THEME_LIST.some((theme) => theme === type);

const parseThemeType = (themeType: string | string[] | undefined) => {
  if (Array.isArray(themeType) || !themeType) return false;
  if (!isShopThemeType(themeType)) return false;

  return themeType;
};

function ThemePage() {
  const router = useRouter();
  const { type } = router.query;

  const parsedThemeType = parseThemeType(type);
  const [currentSortType, setCurrentSortType] = useState<ShopThemeSortType>('popular');
  const { data: themeShopList } = useGetShopByThemeQuery({
    theme: parsedThemeType || '아기자기한',
    sortType: currentSortType,
    offset: 1,
    limit: 16,
  });

  const filterProps = [
    { filterName: '리뷰 많은 순', onClick: () => setCurrentSortType('review') },
    { filterName: '저장 많은 순', onClick: () => setCurrentSortType('popular') },
  ];
  const showCurrentThemeList2 = () => {
    if (!parsedThemeType && themeShopList) return;
    return themeShopList?.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);
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
      <ShopList>{showCurrentThemeList2()}</ShopList>
    </Container>
  );
}
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
