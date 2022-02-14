import ReviewCard from 'components/common/ReviewCard';
import { useGetMyScrapReviewQuery } from 'features/reviews/reviewApi';

function OtherMyScrapReview() {
  const { data: myScrapResponse } = useGetMyScrapReviewQuery();

  if (!myScrapResponse) return <>[]</>;

  return (
    <>
      {myScrapResponse.map((myScrapReview) => (
        <ReviewCard key={myScrapReview.shopId} reviewData={myScrapReview} />
      ))}
    </>
  );
}

export default OtherMyScrapReview;
