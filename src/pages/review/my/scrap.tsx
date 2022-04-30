import ReviewCard from 'components/common/ReviewCard';
import { useGetMyScrapReviewQuery } from 'features/reviews/reviewApi';
import styled from 'styled-components';
import { theme } from 'styles/theme';

function Scrap() {
  const { data: reviewMyScrapList } = useGetMyScrapReviewQuery();
  return (
    <StyledContainer>
      <h2>스크랩한 리뷰</h2>
      <StyledCardWrapper>
        {reviewMyScrapList &&
          reviewMyScrapList.map((review) => (
            <ReviewCard key={review.reviewId} reviewData={review} isHoverAvailable />
          ))}
      </StyledCardWrapper>
    </StyledContainer>
  );
}

export default Scrap;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 0;

  & > h2 {
    font-weight: bold;
    font-size: 3rem;
    line-height: 4.3rem;
    color: ${theme.colors.black2};
  }
`;

const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4rem 2.4rem;
  margin-top: 5.6rem;
`;
