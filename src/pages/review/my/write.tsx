import { wrapper } from 'app/store';
import ReviewCard from 'components/common/ReviewCard';
import WriteReviewBtn from 'components/common/WriteReviewBtn';
import { reviewApi } from 'features/reviews/reviewApi';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ReviewMyWriteResponse } from 'types/review';

interface MyreviewPrefetchProps {
  reviewList: ReviewMyWriteResponse[];
}

function Write(props: MyreviewPrefetchProps) {
  const { reviewList } = props;
  const router = useRouter();

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
        {reviewList.map((review) => (
          <ReviewCard key={review.reviewId} reviewData={review} isHoverAvailable />
        ))}
      </StyledCardWrapper>
    </StyledContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;
  const reviewMyWriteResult = await dispatch(reviewApi.endpoints.getMyWriteReview.initiate());

  console.log('★★★★★★★★★★★★★');
  console.log(reviewMyWriteResult.data);
  console.log('★★★★★★★★★★★★★');
  return {
    props: {
      reviewList: reviewMyWriteResult.data || [],
    },
  };
});

export default Write;

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
