import ReviewCard from 'components/common/ReviewCard';
import { useGetMyScrapReviewQuery } from 'features/reviews/reviewApi';

function OtherMyScrapReview({ reviewId }: { reviewId: number }) {
  const { data: myScrapResponse } = useGetMyScrapReviewQuery();

  if (!myScrapResponse) return <div />; // 로더 삽입하면 좋을 것 같음.

  return (
    <>
      {myScrapResponse
        .filter((_) => _.reviewId !== reviewId)
        .map((myScrapReview) => (
          <ReviewCard key={myScrapReview.shopId} reviewData={myScrapReview} />
        ))}
    </>
  );
}

export default OtherMyScrapReview;
