import ReviewCard from 'components/common/ReviewCard';
import { useGetReviewByShopIdQuery } from 'features/reviews/reviewApi';
import { ReviewShopIdRequestParams } from 'types/review';

function OtherShopReview({ reqInfo }: { reqInfo: ReviewShopIdRequestParams }) {
  const { data: reviewResponse } = useGetReviewByShopIdQuery(reqInfo, { skip: !reqInfo });

  if (!reviewResponse) return <>[]</>;

  return (
    <>
      {reviewResponse.data.map((reviewInfo) => (
        <ReviewCard key={reviewInfo.shopId} reviewData={reviewInfo} />
      ))}
    </>
  );
}

export default OtherShopReview;
