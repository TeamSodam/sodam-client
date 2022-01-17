import Image from 'next/image';
import LikeReviewIC from 'public/assets/ic_likeReview.svg';
import ScrapReviewIC from 'public/assets/ic_scrapReview.svg';
import { useState } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import { Review } from 'types/review';

import ImageSlider from './ImageSlider';

const dummyImageList = [
  '/assets/dummy/dummy-image.jpg',
  '/assets/dummy/dummy-image.jpg',
  '/assets/dummy/dummy-image.jpg',
  '/assets/dummy/dummy-image.jpg',
  '/assets/dummy/dummy-image.jpg',
  '/assets/dummy/dummy-image.jpg',
  '/assets/dummy/dummy-image.jpg',
  '/assets/dummy/dummy-image.jpg',
];

interface ReviewDetailCardProps {
  reviewData: Review;
}

function ReviewDetailCard(props: ReviewDetailCardProps) {
  const { reviewData } = props;

  const {
    shopName,
    category,
    writerName,
    writerThumbnail,
    date,
    likeCount,
    scrapCount,
    content,
    tag,
  } = reviewData;

  const [isLikeClicked, setLikeClicked] = useState(true);
  const [isScrapClicked, setScrapClicked] = useState(true);

  const likedCount = likeCount > 99 ? '99+' : likeCount;
  const scrapedCount = scrapCount > 99 ? '99+' : scrapCount;

  return (
    <StyledReviewDetailCardContainer>
      <Header>
        <ShopName>{shopName}</ShopName>
        <ShopInfo>{category}</ShopInfo>
      </Header>
      <ReviewDetailCardContent>
        <ReviewDetailCardHeader>
          <div className="profile">
            <Image src={writerThumbnail} alt="profile" width={48} height={48} />
            <ReviewInfo>
              <ReviewWriter>{writerName}</ReviewWriter>
              <ReviewWriteDate>{date}</ReviewWriteDate>
            </ReviewInfo>
          </div>
          <IconContainer>
            <LikeReview>
              <LikeIcon onClick={() => setLikeClicked(!isLikeClicked)} isLike={isLikeClicked}>
                <LikeReviewIC />
              </LikeIcon>
              <p>{likedCount}</p>
            </LikeReview>
            <ScrapReview>
              <ScrapIcon onClick={() => setScrapClicked(!isScrapClicked)} isScrap={isScrapClicked}>
                <ScrapReviewIC />
              </ScrapIcon>
              <p>{scrapedCount}</p>
            </ScrapReview>
          </IconContainer>
        </ReviewDetailCardHeader>
        <ImageSlider imageList={dummyImageList} />
        <ReviewTextInfo>
          <ReviewProductInfo>
            <p>인테리어소품</p>
            <p> : </p>
            <p>10,000 - 14,990원</p>
          </ReviewProductInfo>
          <ReviewContent>{content}</ReviewContent>
        </ReviewTextInfo>
        <ReviewTagList>
          {tag.map((eachTag) => (
            <ReviewTag key={shortid.generate()}>{`${eachTag}`}</ReviewTag>
          ))}
        </ReviewTagList>
      </ReviewDetailCardContent>
    </StyledReviewDetailCardContainer>
  );
}

const StyledReviewDetailCardContainer = styled.div``;

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

const ReviewDetailCardContent = styled.div`
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

const LikeIcon = styled.div<{ isLike: boolean }>`
  width: 2.9rem;
  height: 2.6rem;

  &:hover {
    cursor: pointer;
  }

  & > svg {
    fill: ${(props) => props.isLike && props.theme.colors.purpleMain};
  }
`;
const ScrapReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    margin-top: 0.4rem;
  }
`;

const ScrapIcon = styled.div<{ isScrap: boolean }>`
  width: 2.2rem;
  height: 2.6rem;
  &:hover {
    cursor: pointer;
  }

  & > svg {
    fill: ${(props) => props.isScrap && props.theme.colors.purpleMain};
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
  height: 28.5rem;
  color: ${({ theme }) => theme.colors.gray1};
`;

const ReviewTagList = styled.div`
  width: 70.8rem;
  margin: 2.6rem auto 4.2rem;
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

export default ReviewDetailCard;
