import { useAppSelector } from 'app/hook';
import DropDownFilter from 'components/common/DropDownFilter';
import EmptyContent from 'components/common/EmptyContent';
import ShopCard from 'components/common/ShopCard';
import { useGetShopByBookmarkQuery } from 'features/shops/shopApi';
import { selectIsLogin } from 'features/users/userSlice';
import { useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ShopBookMarkRequestType } from 'types/shop';

const emptyContentData = {
  title: '저장한 소품샵',
  src: '/assets/img_shopNoContent.png',
  label: '아직 저장한 소품샵이 없어요',
  subLabel: '취향저격 소품샵 찾으러 가볼까요?',
  button: '테마별 소품샵 보러가기',
  buttonUrl: '/shop/theme/아기자기한',
};

function Collect() {
  const isLogin = useAppSelector(selectIsLogin);
  const [currentSort, setCurrentSort] = useState<ShopBookMarkRequestType>('save');
  const { data: collectShopList } = useGetShopByBookmarkQuery(
    {
      sort: currentSort,
      offset: 1,
      limit: 12,
    },
    {
      skip: !isLogin,
    },
  );

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
      {collectShopList?.length ? (
        <>
          <h2>저장한 소품샵</h2>
          <StyledFilterWrapper>
            <DropDownFilter pageType="collect" filterProps={filterProps} />
          </StyledFilterWrapper>
          <StyledCardWrapper>
            {collectShopList &&
              collectShopList.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />)}
          </StyledCardWrapper>
        </>
      ) : (
        <EmptyContent emptyContentData={emptyContentData} />
      )}
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

  ${applyMediaQuery('mobile')} {
    margin-top: 1.4rem;
    & > h2 {
      font-size: 1.4rem;
      line-height: 2rem;
    }
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
