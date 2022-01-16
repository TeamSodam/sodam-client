import ImageSlider from 'components/review/ImageSlider';
import Image from 'next/image';
import styled from 'styled-components';

function Detail() {
  const imageSliderDummyData: string[] = [
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
  ];

  return (
    <StyledContainer>
      <Header>
        <ShopName>마인띵스</ShopName>
        <ShopInfo>문구·팬시, 인테리어소품</ShopInfo>
      </Header>
      <ReviewDetailCardContainer>
        <ReviewDetailCardHeader>
          <div className="profile">
            <Image src={'/assets/ex_profile.jpg'} alt="profile" width={48} height={48} />
            <ReviewInfo>
              <ReviewWriter>슈슉슈슈슉슈슈발로마</ReviewWriter>
              <ReviewWriteDate>2022년 01월 05일</ReviewWriteDate>
            </ReviewInfo>
          </div>
          <IconContainer>
            <LikeReview>
              <Image
                className="review_icon"
                src={'/assets/likeReviewIcon.svg'}
                width={29}
                height={26}
                alt="like"
              />
              <p>35</p>
            </LikeReview>
            <SaveReview>
              <Image
                className="review_icon"
                src={'/assets/scrapReviewIcon.svg'}
                width={22}
                height={26}
                alt="save"
              />
              <p>102</p>
            </SaveReview>
          </IconContainer>
        </ReviewDetailCardHeader>
        <ImageSlider imageList={imageSliderDummyData} />
        <ReviewTextInfo>
          <ReviewProductInfo>
            <p>인테리어소품</p>
            <p> : </p>
            <p>10,000 - 14,990원</p>
          </ReviewProductInfo>
          <ReviewContent>
            리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용
            더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자
            리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용
            더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자
            리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용
            더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자
            리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용
            더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자
            리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용
            더미텍스트 500자 리뷰용 더미텍스트 500자 리뷰용 더
          </ReviewContent>
        </ReviewTextInfo>
        <ReviewTagList>
          <ReviewTag>#여덟글자해시태그</ReviewTag>
          <ReviewTag>#여덟글자해시태그</ReviewTag>
          <ReviewTag>#여덟글자해시태그</ReviewTag>
          <ReviewTag>#여덟글자해시태그</ReviewTag>
          <ReviewTag>#여덟글자해시태그</ReviewTag>
        </ReviewTagList>
      </ReviewDetailCardContainer>
      <OtherReviewList>
        <ReviewListHeader>
          <HeaderTitle>이 소품샵의 다른 리뷰</HeaderTitle>
          <Filter />
        </ReviewListHeader>
      </OtherReviewList>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  width: 79.2rem;
  margin: 7.2rem 56.4rem 8rem 56.4rem;
`;

const Header = styled.header`
  margin-bottom: 4rem;
`;

const ShopName = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black2};
  margin-bottom: 0.7rem;
`;

const ShopInfo = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray1};
`;

const ReviewDetailCardContainer = styled.div`
  width: 100%;
  height: 107.7rem;
  border: solid 2px ${({ theme }) => theme.colors.gray2};
  border-radius: 10px;
  margin-bottom: 5.6rem;
`;
const ReviewDetailCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4.1rem 4.1rem 2.3rem 4.1rem;
  .profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      border-radius: 50px;
    }
  }
`;
const ReviewInfo = styled.div`
  margin-left: 1.6rem;
`;

const ReviewWriter = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.6rem;
  margin-bottom: 0.7rem;
  color: ${({ theme }) => theme.colors.black1};
`;

const ReviewWriteDate = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.gray1};
`;

const IconContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.purpleMain};
`;

const LikeReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3.5rem;

  & > p {
    margin-top: 0.4rem;
  }
`;

const SaveReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    margin-top: 0.4rem;
  }
`;

const ReviewTextInfo = styled.div`
  width: 70.8rem;
  margin: 0 auto 2.6rem;
`;

const ReviewProductInfo = styled.div`
  display: flex;
  justify-content: center;
  margin: 4.1rem 0 2.1rem 0;
  font-size: 1.4rem;
  font-weight: 400;
  width: 100%;
  color: ${({ theme }) => theme.colors.purpleText};
`;

const ReviewContent = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 3.2rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray1};
`;

const ReviewTagList = styled.div`
  width: 70.8rem;
  margin: 0 auto 2.6rem;
`;

const ReviewTag = styled.span`
  display: inline-block;
  height: 2.4rem;
  line-height: 2rem;
  margin-right: 0.7rem;
  padding: 0 1rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 2px ${({ theme }) => theme.colors.purpleText};
  border-radius: 30px;
  color: ${({ theme }) => theme.colors.purpleText};
  font-size: 1.2rem;
`;
const OtherReviewList = styled.div``;

const ReviewListHeader = styled.div``;

const HeaderTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black1};
`;

const Filter = styled.div``;

export default Detail;
