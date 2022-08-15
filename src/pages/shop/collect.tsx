import { useAppSelector } from 'app/hook';
import DropDownFilter from 'components/common/DropDownFilter';
import EmptyContent from 'components/common/EmptyContent';
import ShopCard from 'components/common/ShopCard';
import { shopApi, useGetShopByBookmarkQuery } from 'features/shops/shopApi';
import { selectIsLogin } from 'features/users/userSlice';
import useInfiniteQuery from 'hooks/useInfiniteQuery';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ShopBookMarkRequestType, ShopResponse } from 'types/shop';

const emptyContentData = {
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
      refetchOnMountOrArgChange: true,
    },
  );
  const [getShopByBookmark] = shopApi.endpoints.getShopByBookmark.useLazyQuery();
  const fetchFn = useCallback(
    async (offset: number) => {
      const result = await getShopByBookmark({
        sort: currentSort,
        limit: 12,
        offset,
      });
      return result?.data || [];
    },
    [currentSort],
  );

  const { data, renderCurrentData } = useInfiniteQuery<ShopResponse>(
    collectShopList,
    fetchFn,
    (shopList) => shopList.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />),
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
      <>
        <StyledFilterWrapper>
          <h2>저장한 소품샵</h2>
          <DropDownFilter pageType="collect" filterProps={filterProps} />
        </StyledFilterWrapper>
        <StyledCardWrapper>{renderCurrentData()}</StyledCardWrapper>
        {!data && <EmptyContent emptyContentData={emptyContentData} />}
      </>
    </StyledContainer>
  );
}

export default Collect;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 0;

  position: relative;

  ${applyMediaQuery('desktop')} {
    margin-top: 4.8rem;
  }
  ${applyMediaQuery('tablet')} {
    margin-top: 3rem;
  }
  ${applyMediaQuery('mobile')} {
    margin-top: 1.4rem;
  }
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > h2 {
    font-weight: bold;
    font-size: 3rem;
    line-height: 4.3rem;
    color: ${theme.colors.black2};
  }

  ${applyMediaQuery('desktop')} {
    & > h2 {
      font-size: 2.6rem;
      line-height: 3.8rem;
    }
  }
  ${applyMediaQuery('tablet')} {
    & > h2 {
      font-size: 2rem;
      line-height: 2.9rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    & > h2 {
      font-size: 1.4rem;
      line-height: 2rem;
    }
  }
`;
const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4rem 2.4rem;
  margin-top: 5.6rem;

  min-height: 50vh;

  ${applyMediaQuery('desktop')} {
    margin-top: 3rem;
    gap: 2.5rem 1.6rem;
  }
  ${applyMediaQuery('tablet')} {
    margin-top: 2.4rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 3.2rem 1.6rem;
  }
  ${applyMediaQuery('mobile')} {
    margin-top: 1.6rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem 0.6rem;
  }
`;
