import Loader from 'components/common/Loader';
import ReviewCard from 'components/common/ReviewCard';
import { reviewApi, useGetReviewByShopIdQuery } from 'features/reviews/reviewApi';
import useInfiniteQuery from 'hooks/useInfiniteQuery';
import { useCallback } from 'react';
import { ReviewByShopIdData, ReviewShopIdRequestParams } from 'types/review';

function OtherShopReview({
  reqInfo,
  reviewId,
}: {
  reviewId: number;
  reqInfo: ReviewShopIdRequestParams;
}) {
  const { data: reviewResponseFirst } = useGetReviewByShopIdQuery(reqInfo, { skip: !reqInfo });
  const [getReviewByShopId] = reviewApi.endpoints.getReviewByShopId.useLazyQuery();

  const fetchFn = useCallback(
    async (offset: number) => {
      const result = await getReviewByShopId({
        ...reqInfo,
        offset,
      });
      return result?.data || [];
    },
    [reqInfo],
  );

  const { data: infiniteData, renderCurrentData } = useInfiniteQuery<ReviewByShopIdData>(
    reviewResponseFirst,
    fetchFn,
    {},
    (reviewList) =>
      reviewList
        .filter((_) => _.reviewId !== reviewId)
        .map((reviewInfo) => <ReviewCard key={reviewInfo.reviewId} reviewData={reviewInfo} />),
  );

  if (!infiniteData) return <Loader />;
  return renderCurrentData();
}

export default OtherShopReview;
