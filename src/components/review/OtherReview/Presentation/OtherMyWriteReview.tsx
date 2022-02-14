import ReviewCard from 'components/common/ReviewCard';
import { useGetMyWriteReviewQuery } from 'features/reviews/reviewApi';

function OtherMyWriteReview() {
  const { data: myWriteResponse } = useGetMyWriteReviewQuery();

  if (!myWriteResponse) return <>[]</>;

  return (
    <>
      {myWriteResponse.map((myWriteReview) => (
        <ReviewCard key={myWriteReview.shopId} reviewData={myWriteReview} />
      ))}
    </>
  );
}

export default OtherMyWriteReview;
