import ReviewCard from 'components/common/ReviewCard';
import WriteReviewBtn from 'components/common/WriteReviewBtn';
import { useGetMyWriteReviewQuery } from 'features/reviews/reviewApi';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

function Write() {
  const router = useRouter();

  const { data: reviewMyWriteList } = useGetMyWriteReviewQuery();

  const navigate = () => {
    router.push('/review/write');
  };

  return (
    <StyledContainer>
      <h2>내가 작성한 리뷰</h2>
      <StyledBtnWrapper>
        <WriteReviewBtn navigate={navigate} />
      </StyledBtnWrapper>
      <StyledCardWrapper>
        {reviewMyWriteList &&
          reviewMyWriteList.map((review) => (
            <ReviewCard
              key={review.reviewId}
              reviewData={review}
              isHoverAvailable
              isMyReview
              isMyReviewMobile
            />
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
  ${applyMediaQuery('tablet')} {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.8rem 1.4rem;
    margin-top: 2.1rem;
  }
  ${applyMediaQuery('mobile')} {
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    margin-top: 1.9rem;
  }
`;
