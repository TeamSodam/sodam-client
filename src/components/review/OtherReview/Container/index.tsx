import { ReactNode } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

interface OtherReviewCardProps {
  reviewDataList: ReactNode;
}
function OtherReviewContainer(props: OtherReviewCardProps) {
  const { reviewDataList } = props;

  return <ReviewList>{reviewDataList}</ReviewList>;
}

const ReviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1.6rem;
  row-gap: 2.4rem;
  ${applyMediaQuery('desktop', 'tablet')} {
    gap: 1.6rem 1rem;
  }
`;

export default OtherReviewContainer;
