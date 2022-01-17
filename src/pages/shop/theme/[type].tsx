import { wrapper } from 'app/store';
import DropDownFilter from 'components/common/DropDownFilter';
import ShopCard from 'components/common/ShopCard';
import ThemeSelector from 'components/ThemeSelector';
import { shopApi } from 'features/shops/shopApi';
import styled from 'styled-components';
import { Shop, ShopThemeType } from 'types/shop';

type ThemePageProps = {
  [key in ShopThemeType]: Shop[];
};

function ThemePage(props: ThemePageProps) {
  const { 아기자기한 } = props;

  const showCurrentThemeList = () =>
    아기자기한.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

  return (
    <Container>
      <Wrapper>
        <ThemeWrapper>
          <ThemeSelector />
        </ThemeWrapper>
      </Wrapper>
      <Delimiter />
      <DropDownWrapper>
        <DropDownFilter pageType="theme" />
      </DropDownWrapper>

      <ShopList>{showCurrentThemeList()}</ShopList>
    </Container>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;

  const THEME_LIST: ShopThemeType[] = ['아기자기한', '힙한', '모던한', '빈티지'];
  let resultData = {};

  for (const theme of THEME_LIST) {
    const result = await dispatch(
      shopApi.endpoints.getShopByTheme.initiate({
        theme,
        sortType: 'popular',
        offset: 9,
        limit: 1,
      }),
    );

    console.log(result);

    resultData = {
      ...resultData,
      [theme]: result.data,
    };
  }

  return {
    props: resultData,
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
