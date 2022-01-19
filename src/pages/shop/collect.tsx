import { wrapper } from 'app/store';
import DropDownFilter from 'components/common/DropDownFilter';
import ShopCard from 'components/common/ShopCard';
import { shopApi } from 'features/shops/shopApi';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Shop } from 'types/shop';

interface CollectPrefetchProps {
  randomShopList: Shop[];
}

function collect(props: CollectPrefetchProps) {
  const { randomShopList } = props;

  return (
    <StyledContainer>
      <h2>저장한 소품샵</h2>
      <StyledFilterWrapper>
        <DropDownFilter pageType="collect" />
      </StyledFilterWrapper>
      <StyledCardWrapper>
        {randomShopList.map((shop) => (
          <ShopCard key={shop.shopId} cardData={shop} />
        ))}
      </StyledCardWrapper>
    </StyledContainer>
  );
}

export default collect;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;
  const randomShopResult = await dispatch(shopApi.endpoints.getShopInfo.initiate('random'));

  return {
    props: {
      randomShopList: randomShopResult.data || [],
    },
  };
});

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 18.75%;

  & > h2 {
    font-weight: bold;
    font-size: 3rem;
    line-height: 4.3rem;
    color: ${theme.colors.black2};
  }
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4rem 2.4rem;
  margin-top: 2.4rem;
`;
