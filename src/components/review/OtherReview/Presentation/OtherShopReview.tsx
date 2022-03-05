import ReviewCard from 'components/common/ReviewCard';
import { useGetReviewByShopIdQuery } from 'features/reviews/reviewApi';
import { ReviewShopIdRequestParams } from 'types/review';

function OtherShopReview({
  reqInfo,
  reviewId,
}: {
  reviewId: number;
  reqInfo: ReviewShopIdRequestParams;
}) {
  const { data: reviewResponse } = useGetReviewByShopIdQuery(reqInfo, { skip: !reqInfo });

  if (!reviewResponse) return <div />; // 로더 삽입하면 좋을 것 같음.

  return (
    <>
      {reviewResponse.data
        .filter((_) => _.reviewId !== reviewId)
        .map((reviewInfo) => (
          <ReviewCard key={reviewInfo.shopId} reviewData={reviewInfo} />
        ))}
    </>
  );
}

export default OtherShopReview;
