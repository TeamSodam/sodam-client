import Loader from 'components/common/Loader';
import ReviewCard from 'components/common/ReviewCard';
import { reviewApi, useGetReviewByShopIdQuery } from 'features/reviews/reviewApi';
import useObserver from 'hooks/useObserver';
import { useEffect, useRef, useState } from 'react';
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

  const [reviewResponse, setReviewResponse] = useState<ReviewByShopIdData[] | undefined>(
    reviewResponseFirst?.data,
  );
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef(null);
  const offsetIndex = useRef(1);

  useEffect(() => {
    if (reviewResponseFirst) {
      setReviewResponse(reviewResponseFirst.data);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [reviewResponseFirst]);

  const onIntersect: IntersectionObserverCallback = async ([entry]) => {
    if (entry.isIntersecting) {
      offsetIndex.current += 1;
      const { data: reviewResponseNext } = await getReviewByShopId({
        ...reqInfo,
        offset: offsetIndex.current,
      });
      if (!reviewResponseNext || !reviewResponse) {
        setIsLoading(true);
      } else {
        reviewResponseNext.data.length > 0 &&
          setReviewResponse([...reviewResponse, ...reviewResponseNext.data]);
        setIsLoading(false);
      }
    }
  };
  useObserver({ target: bottomRef, onIntersect });

  if (isLoading || !reviewResponse) return <Loader />;
  return (
    <>
      {reviewResponse
        .filter((_) => _.reviewId !== reviewId)
        .map((reviewInfo) => (
          <ReviewCard key={reviewInfo.shopId} reviewData={reviewInfo} />
        ))}
      <div ref={bottomRef} />
    </>
  );
}

export default OtherShopReview;
