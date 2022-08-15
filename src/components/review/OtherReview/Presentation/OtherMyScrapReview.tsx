import Loader from 'components/common/Loader';
import ReviewCard from 'components/common/ReviewCard';
import { useGetMyScrapReviewQuery } from 'features/reviews/reviewApi';
import useInfiniteQuery from 'hooks/useInfiniteQuery';
import { useEffect, useState } from 'react';
import { ReviewMyScrapResponse } from 'types/review';

const PAGE_LIMIT = 6;

function OtherMyScrapReview({ reviewId }: { reviewId: number }) {
  const { data: myScrapResponse } = useGetMyScrapReviewQuery();

  const [paginatedData, setPaginatedData] = useState<ReviewMyScrapResponse[][]>([]);
  const [offset, setOffset] = useState(0);

  const fetchNextData = () => {
    if (paginatedData.length === offset + 1) return [];
    setOffset((prevOffset) => prevOffset + 1);
    return paginatedData[offset + 1];
  };

  const { renderCurrentData } = useInfiniteQuery(paginatedData[0], fetchNextData, (scrapList) =>
    scrapList
      .filter((_) => _.reviewId !== reviewId)
      .map((myScrapReview) => <ReviewCard key={myScrapReview.shopId} reviewData={myScrapReview} />),
  );

  useEffect(() => {
    if (myScrapResponse) {
      const initialPaginatedData = myScrapResponse.reduce(
        (acc, cur, idx) => {
          const currentPage = Math.floor(idx / PAGE_LIMIT);
          const currentPageData = acc[currentPage] ? [...acc[currentPage], cur] : [cur];
          return [...acc.slice(0, currentPage), currentPageData];
        },
        [[]] as ReviewMyScrapResponse[][],
      );

      setPaginatedData(initialPaginatedData);
    }
  }, [myScrapResponse]);

  if (!myScrapResponse) return <Loader />;

  return renderCurrentData();
}

export default OtherMyScrapReview;
