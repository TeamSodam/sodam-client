import DropDownFilter from 'components/common/DropDownFilter';
import ShopCard from 'components/common/ShopCard';
import { useGetShopByBookmarkQuery } from 'features/shops/shopApi';
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ShopBookMarkRequestType } from 'types/shop';

function Collect() {
  const [currentSort, setCurrentSort] = useState<ShopBookMarkRequestType>('save');
  const { data: collectShopList } = useGetShopByBookmarkQuery({
    sort: currentSort,
    offset: 1,
    limit: 12,
  });

  const filterProps = [
    {
      filterName: '저장 많은 순',
      onClick: () => setCurrentSort('save'),
    },
    {
      filterName: '리뷰 많은 순',
      onClick: () => setCurrentSort('review'),
    },
    {
      filterName: '최근 저장한 순',
      onClick: () => setCurrentSort('recent'),
    },
  ];

  return (
    <StyledContainer>
      <h2>저장한 소품샵</h2>
      <StyledFilterWrapper>
        <DropDownFilter pageType="collect" filterProps={filterProps} />
      </StyledFilterWrapper>
      <StyledCardWrapper>
        {collectShopList &&
          collectShopList.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />)}
      </StyledCardWrapper>
    </StyledContainer>
  );
}

export default Collect;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 0;

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
