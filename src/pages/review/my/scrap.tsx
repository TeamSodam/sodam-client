import { useAppSelector } from 'app/hook';
import EmptyContent from 'components/common/EmptyContent';
import ReviewCard from 'components/common/ReviewCard';
import { useGetMyScrapReviewQuery } from 'features/reviews/reviewApi';
import { selectIsLogin } from 'features/users/userSlice';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

const emptyContentData = {
  title: '스크랩한 리뷰',
  src: '/assets/img_scrapNoContent.png',
  label: '아직 스크랩한 리뷰가 없어요',
  // eslint-disable-next-line prettier/prettier
  subLabel: '홈 화면에서 \'오늘의 리뷰\' 구경하러 가볼까요?',
  button: '홈 화면 바로가기',
  buttonUrl: '/',
};

function Scrap() {
  const isLogin = useAppSelector(selectIsLogin);
  const { data: reviewMyScrapList } = useGetMyScrapReviewQuery(undefined, {
    skip: !isLogin,
    refetchOnMountOrArgChange: true,
  });

  return (
    <StyledContainer>
      {!reviewMyScrapList?.length ? (
        <EmptyContent emptyContentData={emptyContentData} />
      ) : (
        <>
          <h2>스크랩한 리뷰</h2>
          <StyledCardWrapper>
            {reviewMyScrapList.map((review) => (
              <ReviewCard
                key={review.reviewId}
                reviewData={review}
                isHoverAvailable
                isMyReviewMobile
              />
            ))}
          </StyledCardWrapper>
        </>
      )}
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

  ${applyMediaQuery('desktop')} {
    margin-top: 5.3rem;
    & > h2 {
      font-size: 2.6rem;
      line-height: 3.8rem;
    }
  }
  ${applyMediaQuery('tablet')} {
    margin-top: 3rem;
    & > h2 {
      font-size: 2rem;
      line-height: 2.9rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    margin-top: 2.4rem;
    & > h2 {
      font-size: 1.4rem;
      line-height: 2rem;
    }
  }
`;

const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4rem 2.4rem;
  margin-top: 5.6rem;
  ${applyMediaQuery('desktop')} {
    gap: 2.8rem 1.7rem;
    margin-top: 5.2rem;
  }
  ${applyMediaQuery('tablet')} {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.8rem 1.4rem;
    margin-top: 2.1rem;
  }
  ${applyMediaQuery('mobile')} {
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }
`;
