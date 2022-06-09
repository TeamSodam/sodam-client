import { useAppSelector } from 'app/hook';
import EmptyContent from 'components/common/EmptyContent';
import ReviewCard from 'components/common/ReviewCard';
import WriteReviewLink from 'components/common/WriteReviewLink';
import { useGetMyWriteReviewQuery } from 'features/reviews/reviewApi';
import { selectIsLogin } from 'features/users/userSlice';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

const emptyContentData = {
  title: '내가 작성한 리뷰',
  src: '/assets/img_writeNoContent.png',
  label: '아직 작성한 리뷰가 없어요',
  subLabel: '다녀온 소품샵 후기를 기록하러 가볼까요?',
  button: '리뷰 작성하기',
  buttonUrl: '/review/write',
};

function Write() {
  const isLogin = useAppSelector(selectIsLogin);
  const router = useRouter();

  const { data: reviewMyWriteList } = useGetMyWriteReviewQuery(undefined, {
    skip: !isLogin,
  });

  return (
    <StyledContainer>
      {!reviewMyWriteList?.length ? (
        <EmptyContent emptyContentData={emptyContentData} />
      ) : (
        <>
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
        </>
      )}
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
