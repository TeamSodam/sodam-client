import Loader from 'components/common/Loader';
import ReviewCard from 'components/common/ReviewCard';
import { reviewApi, useGetReviewByShopIdQuery } from 'features/reviews/reviewApi';
import useInfiniteQuery from 'hooks/useInfiniteQuery';
import { LoadPoint as PrevLoadPoint } from 'pages/shop/theme/[type]';
import { useCallback } from 'react';
import styled from 'styled-components';
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

  const {
    data: infiniteData,
    isLoading: isDataLoading,
    loadPointRef,
  } = useInfiniteQuery<ReviewByShopIdData>(reviewResponseFirst, fetchFn, {});

  if (!infiniteData) return <Loader />;
  return (
    <>
      {infiniteData
        .filter((_) => _.reviewId !== reviewId)
        .map((reviewInfo) => (
          <ReviewCard key={reviewInfo.content} reviewData={reviewInfo} />
        ))}
      <LoadPoint ref={loadPointRef}>{isDataLoading && <Loader />}</LoadPoint>
    </>
  );
}

const LoadPoint = styled(PrevLoadPoint)`
  position: absolute;
  bottom: 0;

  transform: translateY(-100%);
`;

export default OtherShopReview;
