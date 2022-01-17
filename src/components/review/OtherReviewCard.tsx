import ReviewCard from 'components/common/ReviewCard';
import styled from 'styled-components';
import { Review } from 'types/review';

interface OtherReviewCardProps {
  reviewListData: Review[];
}

function OtherReviewCard(props: OtherReviewCardProps) {
  const { reviewListData } = props;

  const reviewDataList = reviewListData.map((data) => (
    <ReviewCard key={data.shopId} reviewData={data} isHoverAvailable />
  ));
  return <ReviewList>{reviewDataList}</ReviewList>;
}

const ReviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  column-gap: 1.6rem;
  row-gap: 2.4rem;
`;

export default OtherReviewCard;
