import { wrapper } from 'app/store';
import ReviewCard from 'components/common/ReviewCard';
import { reviewApi } from 'features/reviews/reviewApi';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ReviewMyScrapResponse } from 'types/review';

interface MyreviewPrefetchProps {
  reviewMyScrapList: ReviewMyScrapResponse[];
}
function Scrap(props: MyreviewPrefetchProps) {
  const { reviewMyScrapList } = props;
  return (
    <StyledContainer>
      <h2>스크랩한 리뷰</h2>
      <StyledCardWrapper>
        {reviewMyScrapList.map((review) => (
          <ReviewCard key={review.reviewId} reviewData={review} isHoverAvailable />
        ))}
      </StyledCardWrapper>
    </StyledContainer>
  );
}

export default Scrap;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;
  const reviewMyScrapResult = await dispatch(reviewApi.endpoints.getMyScrapReview.initiate());

  return {
    props: {
      reviewMyScrapList: reviewMyScrapResult.data || [],
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
