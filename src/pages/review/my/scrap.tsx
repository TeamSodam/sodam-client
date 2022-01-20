import { wrapper } from 'app/store';
import ReviewCard from 'components/common/ReviewCard';
import { reviewApi } from 'features/reviews/reviewApi';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Review } from 'types/review';

interface MyreviewPrefetchProps {
  reviewList: Review[];
}
function Scrap(props: MyreviewPrefetchProps) {
  const { reviewList } = props;
  return (
    <StyledContainer>
      <h2>스크랩한 리뷰</h2>
      <StyledCardWrapper>
        {reviewList.map((review) => (
          <ReviewCard key={review.reviewId} reviewData={review} isHoverAvailable />
        ))}
      </StyledCardWrapper>
    </StyledContainer>
  );
}

export default Scrap;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;
  const reviewResult = await dispatch(reviewApi.endpoints.getReviewRecent.initiate());

  return {
    props: {
      reviewList: reviewResult.data || [],
    },
  };
});

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 18.75%;

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
