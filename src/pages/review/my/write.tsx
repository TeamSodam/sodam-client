import ReviewCard from 'components/common/ReviewCard';
import WriteReviewLink from 'components/common/WriteReviewLink';
import { useGetMyWriteReviewQuery } from 'features/reviews/reviewApi';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

function Write() {
  const { data: reviewMyWriteList } = useGetMyWriteReviewQuery();

  return (
    <StyledContainer>
      <h2>내가 작성한 리뷰</h2>
      <StyledBtnWrapper>
        <WriteReviewLink href="/review/write" />
      </StyledBtnWrapper>
      <StyledCardWrapper>
        {reviewMyWriteList &&
          reviewMyWriteList.map((review) => (
            <ReviewCard key={review.reviewId} reviewData={review} isHoverAvailable isMyReview />
          ))}
      </StyledCardWrapper>
    </StyledContainer>
  );
}

export default Write;

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

  ${applyMediaQuery('mobile')} {
    margin: 2.5rem 0;
    & > h2 {
      font-size: 1.4rem;
      line-height: 2rem;
    }
  }
`;
const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4rem 2.4rem;
  margin-top: 2.5rem;
`;
