import { wrapper } from 'app/store';
import DropDownFilter from 'components/common/DropDownFilter';
import OtherReviewCard from 'components/review/OtherReviewCard';
import ReviewDetailCard from 'components/review/ReviewDetailCard';
import { REVIEW_MAP } from 'constants/reviewActiveMap';
import {
  reviewApi,
  useGetMyScrapReviewQuery,
  useGetMyWriteReviewQuery,
  useGetReviewByShopIdQuery,
  useGetShopReviewByIdQuery,
} from 'features/reviews/reviewApi';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  ReviewByShopIdData,
  ReviewMyScrapResponse,
  ReviewMyWriteResponse,
  ReviewSortType,
} from 'types/review';

export const parseShopId = (shopId: string | string[] | undefined) => {
  if (!shopId) return 0;
  if (Array.isArray(shopId)) return +shopId.join('');

  return +shopId;
};
export const parseShopName = (shopName: string | string[] | undefined) => {
  if (!shopName) return '';
  if (typeof shopName === 'string') return JSON.parse(JSON.stringify(shopName));
};

function Detail({ params, query }: { params: NextParsedUrlQuery; query: NextParsedUrlQuery }) {
  const [trigger] = reviewApi.useLazyGetReviewByShopIdQuery();

  const REVIEW_ID = parseShopId(params.reviewId);
  const SHOP_ID = parseShopId(query.shopId);
  const REVIEW_TYPE = parseShopName(query.reviewType);
  const SORT_TYPE = 'save';

  const { data: reviewData } = useGetShopReviewByIdQuery({
    reviewId: REVIEW_ID,
    shopId: SHOP_ID,
  });

  const { data: reviewResponse } = useGetReviewByShopIdQuery({
    shopId: SHOP_ID,
    sortType: SORT_TYPE,
    offset: 1,
    limit: 9,
  });

  const { data: myWriteResponse } = useGetMyWriteReviewQuery();
  const { data: myScrapResponse } = useGetMyScrapReviewQuery();

  const [currentList, setCurrentList] = useState<
    ReviewByShopIdData[] | ReviewMyScrapResponse[] | ReviewMyWriteResponse[] | undefined
  >();

  const getFilteredReviewListData = () => {
    if (!currentList) return [];
    let tmpList = currentList as ReviewByShopIdData[];

    if (REVIEW_TYPE === 'myWrite') tmpList = currentList as ReviewMyWriteResponse[];
    if (REVIEW_TYPE === 'myScrap') tmpList = currentList as ReviewMyScrapResponse[];

    return tmpList.filter(({ reviewId }) => reviewId !== REVIEW_ID);
  };

  const updateList = async (sortType: ReviewSortType) => {
    if (!SHOP_ID) return;
    const result = await trigger({
      shopId: SHOP_ID,
      sortType,
      offset: 1,
      limit: 9,
    });

    if (result.data) setCurrentList(result.data.data);
  };

  const filterProps = [
    {
      filterName: '스크랩 많은 순',
      onClick: () => {
        updateList('save');
      },
    },
    {
      filterName: '좋아요 많은 순',
      onClick: () => {
        updateList('like');
      },
    },
    {
      filterName: '최신 순',
      onClick: () => {
        updateList('recent');
      },
    },
  ];

  useEffect(() => {
    if (reviewResponse && myWriteResponse && myScrapResponse) {
      if (REVIEW_TYPE === 'myWrite') {
        setCurrentList(myWriteResponse);
      } else if (REVIEW_TYPE === 'myScrap') {
        setCurrentList(myScrapResponse);
      } else {
        setCurrentList(reviewResponse.data);
      }
    }
  }, [reviewResponse, myWriteResponse, myScrapResponse, REVIEW_TYPE]);

  return (
    <StyledReviewDetailWrapper>
      {reviewData && <ReviewDetailCard reviewData={reviewData} />}
      <OtherReviewCardWrapper>
        <ReviewListHeader>
          <HeaderTitle>{REVIEW_MAP[REVIEW_TYPE]}</HeaderTitle>
          {REVIEW_TYPE === 'shop' && <DropDownFilter pageType="detail" filterProps={filterProps} />}
        </ReviewListHeader>
        <ReviewListContent>
          {currentList && <OtherReviewCard reviewListData={getFilteredReviewListData()} />}
        </ReviewListContent>
      </OtherReviewCardWrapper>
    </StyledReviewDetailWrapper>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async (context) => ({
  props: {
    params: context.params,
    query: context.query,
  },
}));

const StyledReviewDetailWrapper = styled.div`
  width: 79.2rem;
  margin: 7.2rem 56.4rem 8rem 56.4rem;
`;

const OtherReviewCardWrapper = styled.div``;

const ReviewListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black1};
`;

const ReviewListContent = styled.div`
  margin-top: 3.2rem;
  width: 100%;
`;

export default Detail;
