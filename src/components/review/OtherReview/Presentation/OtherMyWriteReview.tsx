import Loader from 'components/common/Loader';
import ReviewCard from 'components/common/ReviewCard';
import { useGetMyWriteReviewQuery } from 'features/reviews/reviewApi';
import useInfiniteQuery from 'hooks/useInfiniteQuery';
import { useEffect, useState } from 'react';
import { ReviewMyWriteResponse } from 'types/review';

const PAGE_LIMIT = 4;

function OtherMyWriteReview({ reviewId }: { reviewId: number }) {
  const { data: myWriteResponse } = useGetMyWriteReviewQuery();

  const [paginatedData, setPaginatedData] = useState<ReviewMyWriteResponse[][]>([]);
  const [offset, setOffset] = useState(0);

  const fetchNextData = () => {
    if (paginatedData.length === offset + 1) return [];
    setOffset((prevOffset) => prevOffset + 1);
    return paginatedData[offset + 1];
  };

  const { renderCurrentData } = useInfiniteQuery(paginatedData[0], fetchNextData, (writeList) =>
    writeList
      .filter((_) => _.reviewId !== reviewId)
      .map((myWriteReview) => <ReviewCard key={myWriteReview.shopId} reviewData={myWriteReview} />),
  );

  useEffect(() => {
    if (myWriteResponse) {
      const initialPaginatedData = myWriteResponse.reduce(
        (acc, cur, idx) => {
          const currentPage = Math.floor(idx / PAGE_LIMIT);
          const currentPageData = acc[currentPage] ? [...acc[currentPage], cur] : [cur];
          return [...acc.slice(0, currentPage), currentPageData];
        },
        [[]] as ReviewMyWriteResponse[][],
      );

      setPaginatedData(initialPaginatedData);
    }
  }, [myWriteResponse]);

  if (!myWriteResponse) return <Loader />;

  return renderCurrentData();
}

export default OtherMyWriteReview;
