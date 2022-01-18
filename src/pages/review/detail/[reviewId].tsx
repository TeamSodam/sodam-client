import DropDownFilter from 'components/common/DropDownFilter';
import OtherReviewCard from 'components/review/OtherReviewCard';
import ReviewDetailCard from 'components/review/ReviewDetailCard';
import { useGetReviewByShopIdQuery, useGetShopReviewByIdQuery } from 'features/reviews/reviewApi';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const parseShopId = (shopId: string | string[] | undefined) => {
  if (!shopId) return 1;
  if (Array.isArray(shopId)) return +shopId.join('');

  return +shopId;
};

function Detail() {
  const router = useRouter();
  const { reviewId, shopId } = router.query;

  const REVIEW_ID = parseShopId(reviewId);
  const SHOP_ID = parseShopId(shopId);
  const SORT_TYPE = 'save';

  const { data: reviewData } = useGetShopReviewByIdQuery({
    reviewId: REVIEW_ID,
    shopId: SHOP_ID,
  });

  const { data: reviewListData } = useGetReviewByShopIdQuery({
    shopId: SHOP_ID,
    sortType: SORT_TYPE,
  });

  return (
    <StyledReviewDetailWrapper>
      {reviewData && reviewData.length > 0 && <ReviewDetailCard reviewData={reviewData[0]} />}
      <OtherReviewCardWrapper>
        <ReviewListHeader>
          <HeaderTitle>이 소품샵의 다른 리뷰</HeaderTitle>
          <DropDownFilter pageType="detail" />
        </ReviewListHeader>
        <ReviewListContent>
          {reviewListData && <OtherReviewCard reviewListData={reviewListData} />}
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