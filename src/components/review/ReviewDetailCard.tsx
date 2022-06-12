import ImageDiv from 'components/common/ImageDiv';
import IcLikeReview from 'components/Icons/IcLikeReview';
import IcScrapReview from 'components/Icons/IcScrapReview';
import { usePostLikeMutation, usePostScrapMutation } from 'features/reviews/reviewApi';
import useMedia from 'hooks/useMedia';
import { useState } from 'react';
import shortid from 'shortid';
import { parseDate } from 'src/utils/parseDate';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { Review } from 'types/review';

import ImageSlider from './ImageSlider';

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
    item,
    reviewId,
    isLiked,
    isScraped,
    image,
  } = reviewData;

  const [likePost] = usePostLikeMutation();
  const [scrapPost] = usePostScrapMutation();
  const [isLikeClicked, setLikeClicked] = useState(isLiked);
  const [isScrapClicked, setScrapClicked] = useState(isScraped);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [currentScrapCount, setCurrentScrapCount] = useState(scrapCount);
  const likedCount = currentLikeCount > 99 ? '99+' : currentLikeCount;
  const scrapedCount = currentScrapCount > 99 ? '99+' : currentScrapCount;

  const getOnClickHandlerByType = (type: 'scrap' | 'like') => {
    const setter = type === 'scrap' ? setCurrentScrapCount : setCurrentLikeCount;
    const isClicked = type === 'scrap' ? isScrapClicked : isLikeClicked;
    const setIsClicked = type === 'scrap' ? setScrapClicked : setLikeClicked;
    const postApiFunc = type === 'scrap' ? scrapPost : likePost;
    const value = isClicked ? -1 : 1;

    setter((prevState) => prevState + value);
    setIsClicked((prevClickState) => !prevClickState);
    postApiFunc({ reviewId, isLiked: !isClicked, isScraped: !isClicked });
  };

  const { isDesktop, isTablet } = useMedia();

  return (
    <StyledReviewDetailCardContainer>
      <Header>
        <ShopName>{shopName}</ShopName>
        <ShopInfo>{category}</ShopInfo>
      </Header>
      <ReviewDetailCardContent>
        <ReviewDetailCardHeader>
          <div className="profile">
            <ImageDiv
              className="profile-image"
              src={writerThumbnail ? writerThumbnail : '/assets/profile_default.svg'}
              layout="fill"
              alt="profile"
            />
            <ReviewInfo>
              <ReviewWriter>{writerName}</ReviewWriter>
              <ReviewWriteDate>{parseDate(date)}</ReviewWriteDate>
            </ReviewInfo>
          </div>
          <IconContainer>
            <LikeReview>
              <IcLikeReview
                fill={isLikeClicked ? theme.colors.purpleMain : 'white'}
                width={isDesktop || isTablet ? 19 : 29}
                height={isDesktop || isTablet ? 17 : 26}
                onClick={() => getOnClickHandlerByType('like')}
              />
              <p>{likedCount}</p>
            </LikeReview>
            <ScrapReview>
              <IcScrapReview
                fill={isScrapClicked ? theme.colors.purpleMain : 'white'}
                width={isDesktop || isTablet ? 15 : 22}
                height={isDesktop || isTablet ? 17 : 26}
                onClick={() => getOnClickHandlerByType('scrap')}
              />
              <p>{scrapedCount}</p>
            </ScrapReview>
          </IconContainer>
        </ReviewDetailCardHeader>
        <ImageSlider imageList={image || []} />
        <ReviewTextInfo>
          {item.length > 0 && (
            <ReviewProductInfo>
              {item.map((itemElement) => (
                <p key={shortid.generate()}>{`${itemElement.itemName} : ${itemElement.price}`}</p>
              ))}
            </ReviewProductInfo>
          )}
          <ReviewContent>{content}</ReviewContent>
        </ReviewTextInfo>
        {tag.length > 0 && (
          <ReviewTagList>
            {tag.map((eachTag) => (
              <ReviewTag key={shortid.generate()}>{`#${eachTag}`}</ReviewTag>
            ))}
          </ReviewTagList>
        )}
      </ReviewDetailCardContent>
    </StyledReviewDetailCardContainer>
  );
}

const StyledReviewDetailCardContainer = styled.div``;

const Header = styled.header`
  margin-bottom: 4rem;
  ${applyMediaQuery('desktop', 'tablet')} {
    margin-bottom: 2.8rem;
  }
`;

const ShopName = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black2};
  margin-bottom: 0.7rem;
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 2.6rem;
    margin-bottom: 0.4rem;
  }
`;

const ShopInfo = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray1};
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;

const ReviewDetailCardContent = styled.div`
  width: 100%;
  height: max-content;
  border: solid 2px ${({ theme }) => theme.colors.gray2};
  border-radius: 10px;
  margin-bottom: 5.6rem;
  ${applyMediaQuery('desktop', 'tablet')} {
    margin-bottom: 4rem;
  }
`;
const ReviewDetailCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4.1rem 4.1rem 2.3rem 4.1rem;
  .profile-image {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
  }
  .profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      border-radius: 50%;
    }
  }
  ${applyMediaQuery('desktop', 'tablet')} {
    margin: 0;
    margin: 1.5rem 1.8rem;
    .profile-image {
      width: 3.2rem;
      height: 3.2rem;
    }
  }
`;

const ReviewInfo = styled.div`
  margin-left: 1.6rem;
  ${applyMediaQuery('desktop', 'tablet')} {
    margin-left: 1.1rem;
  }
`;

const ReviewWriter = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.6rem;
  margin-bottom: 0.7rem;
  color: ${({ theme }) => theme.colors.black1};
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin-bottom: 0.2rem;
  }
`;

const ReviewWriteDate = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.gray1};
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 1rem;
    line-height: 1rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.purpleMain};
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 1rem;
  }
`;

const LikeReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3.5rem;

  & > p {
    margin-top: 0.4rem;
  }

  ${applyMediaQuery('desktop', 'tablet')} {
    margin-right: 1.5rem;
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

const ReviewTextInfo = styled.div`
  width: 100%;
  padding: 4.1rem 4.2rem;
  padding-bottom: 2.6rem;

  ${applyMediaQuery('desktop', 'tablet')} {
    margin: 0;
    padding: 2rem 2.5rem;
  }
`;

const ReviewProductInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2.1rem;
  font-size: 1.4rem;
  font-weight: 400;
  width: 100%;
  color: ${({ theme }) => theme.colors.purpleText};
  gap: 0.8rem;

  & > p:after {
    content: '|';
    margin-left: 0.8rem;
    color: ${({ theme }) => theme.colors.purpleText};
  }
  & > p:last-child:after {
    content: unset;
  }
  ${applyMediaQuery('desktop', 'tablet')} {
    margin: 0;
    margin-bottom: 2rem;
    font-size: 1rem;
    gap: 0.6rem;
    & > p:after {
      margin-left: 0.6rem;
    }
  }
`;

const ReviewContent = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 3.2rem;
  width: 100%;
  height: max-content;
  color: ${({ theme }) => theme.colors.gray1};
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
`;

const ReviewTagList = styled.div`
  width: 100%;
  padding: 4.2rem;
  padding-top: 0;
  ${applyMediaQuery('desktop', 'tablet')} {
    padding: 2.5rem;
    padding-top: 0;
  }
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
  ${applyMediaQuery('desktop', 'tablet')} {
    height: 2rem;
    line-height: 1.8rem;
    margin-right: 0.8rem;
    padding: 0 0.7rem;
    font-size: 1rem;
  }
`;

export default ReviewDetailCard;
