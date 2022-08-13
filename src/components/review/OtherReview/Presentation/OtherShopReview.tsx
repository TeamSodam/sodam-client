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

  const fetchFn = useCallback(async (offset: number) => {
    const result = await getReviewByShopId({
      ...reqInfo,
      offset,
    });
    return result?.data || [];
  }, []);

  const {
    data: infiniteData,
    isLoading: isDataLoading,
    loadPointRef,
  } = useInfiniteQuery<ReviewByShopIdData>(reviewResponseFirst, fetchFn, {});

  if (isDataLoading || !infiniteData) return <Loader />;
  return (
    <>
      {infiniteData
        .filter((_) => _.reviewId !== reviewId)
        .map((reviewInfo) => (
          <ReviewCard key={reviewInfo.content} reviewData={reviewInfo} />
        ))}
      <div ref={loadPointRef} />
    </>
  );
}

export default OtherShopReview;
