import { wrapper } from 'app/store';
import DropDownFilter from 'components/common/DropDownFilter';
import ShopCard from 'components/common/ShopCard';
import { shopApi } from 'features/shops/shopApi';
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ShopResponse } from 'types/shop';

interface CollectPrefetchProps {
  collectShopList: ShopResponse[];
}

function Collect(props: CollectPrefetchProps) {
  const { collectShopList } = props;
  const [trigger] = shopApi.useLazyGetShopByBookmarkQuery();
  const [currentList, setCurrentList] = useState<ShopResponse[] | undefined>(collectShopList);

  const updateList = async (sortType: string) => {
    const result = await trigger({ sort: sortType, offset: 1, limit: 12 });
    setCurrentList(result.data);
  };

  const filterProps = [
    {
      filterName: '저장 많은 순',
      onClick: async () => updateList('save'),
    },
    {
      filterName: '리뷰 많은 순',
      onClick: async () => updateList('review'),
    },
    {
      filterName: '최근 저장한 순',
      onClick: async () => updateList('recent'),
    },
  ];

  return (
    <StyledContainer>
      <h2>저장한 소품샵</h2>
      <StyledFilterWrapper>
        <DropDownFilter pageType="collect" filterProps={filterProps} />
      </StyledFilterWrapper>
      <StyledCardWrapper>
        {currentList?.map((shop) => (
          <ShopCard key={shop.shopId} cardData={shop} />
        ))}
      </StyledCardWrapper>
    </StyledContainer>
  );
}

export default Collect;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;
  const collectShopResult = await dispatch(
    shopApi.endpoints.getShopByBookmark.initiate({ sort: 'save', offset: 1, limit: 12 }),
  );

  return {
    props: {
      collectShopList: collectShopResult.data || [],
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
