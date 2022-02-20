import ReviewCard from 'components/common/ReviewCard';
import { useGetMyWriteReviewQuery } from 'features/reviews/reviewApi';

function OtherMyWriteReview({ reviewId }: { reviewId: number }) {
  const { data: myWriteResponse } = useGetMyWriteReviewQuery();

  if (!myWriteResponse) return <div />; // 로더 삽입하면 좋을 것 같음.

  return (
    <>
      {myWriteResponse
        .filter((_) => _.reviewId !== reviewId)
        .map((myWriteReview) => (
          <ReviewCard key={myWriteReview.shopId} reviewData={myWriteReview} />
        ))}
    </>
  );
}

export default OtherMyWriteReview;
