import DropDownFilter from 'components/common/DropDownFilter';
import OtherReviewCard from 'components/review/OtherReviewCard';
import ReviewDetailCard from 'components/review/ReviewDetailCard';
import {
  reviewApi,
  useGetReviewByShopIdQuery,
  useGetShopReviewByIdQuery,
} from 'features/reviews/reviewApi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { ReviewByShopIdResponse, ReviewSortType } from 'types/review';

const parseShopId = (shopId: string | string[] | undefined) => {
  if (!shopId) return 1;
  if (Array.isArray(shopId)) return +shopId.join('');

  return +shopId;
};

function Detail() {
  const router = useRouter();
  const { reviewId, shopId } = router.query;
  const [trigger] = reviewApi.useLazyGetReviewByShopIdQuery();

  const REVIEW_ID = parseShopId(reviewId);
  const SHOP_ID = parseShopId(shopId);
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
  const [currentList, setCurrentList] = useState<ReviewByShopIdResponse | undefined>(
    reviewResponse,
  );

  const getFilteredReviewListData = () => {
    if (!currentList) return [];
    const { data: reviewList } = currentList;
    if (reviewList && reviewList.length > 0) {
      return reviewList?.filter((review) => review.reviewId !== REVIEW_ID);
    }
    return [];
  };

  const updateList = async (sortType: ReviewSortType) => {
    const result = await trigger({
      shopId: SHOP_ID,
      sortType,
      offset: 1,
      limit: 9,
    });
    console.log(result.data);
    setCurrentList(result.data);
  };

  const filterProps = [
    {
      filterName: '좋아요 많은 순',
      onClick: () => {
        updateList('like');
      },
    },
    {
      filterName: '스크랩 많은 순',
      onClick: async () => {
        updateList('save');
      },
    },
    {
      filterName: '최신 순',
      onClick: async () => {
        updateList('recent');
      },
    },
  ];

  return (
    <StyledReviewDetailWrapper>
      {reviewData && <ReviewDetailCard reviewData={reviewData} />}
      <OtherReviewCardWrapper>
        <ReviewListHeader>
          <HeaderTitle>이 소품샵의 다른 리뷰</HeaderTitle>
          <DropDownFilter pageType="detail" filterProps={filterProps} />
        </ReviewListHeader>
        <ReviewListContent>
          {currentList && <OtherReviewCard reviewListData={getFilteredReviewListData()} />}
        </ReviewListContent>
      </OtherReviewCardWrapper>
    </StyledReviewDetailWrapper>
  );
}

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
