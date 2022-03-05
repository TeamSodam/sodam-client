import { ReactNode } from 'react';
import styled from 'styled-components';

interface OtherReviewCardProps {
  reviewDataList: ReactNode;
}
function OtherReviewContainer(props: OtherReviewCardProps) {
  const { reviewDataList } = props;

  return <ReviewList>{reviewDataList}</ReviewList>;
}

const ReviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  column-gap: 1.6rem;
  row-gap: 2.4rem;
`;

export default OtherReviewContainer;
