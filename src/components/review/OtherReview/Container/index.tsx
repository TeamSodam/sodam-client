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
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1.6rem;
  row-gap: 2.4rem;
  ${applyMediaQuery('desktop')} {
    gap: 1.6rem 1rem;
  }
  ${applyMediaQuery('tablet')} {
    gap: 1rem 0.2rem;
    & > div {
      transform: scale(0.96);
      transform-origin: top left;
    }
  }
  ${applyMediaQuery('mobile')} {
    gap: 1.2rem 0.7rem;
    & > div {
      transform: scale(0.99);
      transform-origin: top left;
    }
  }
`;

export default OtherReviewContainer;
