import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import loadImageSafely from 'src/utils/loadImageSafely';
import parseCategorySafely from 'src/utils/parseCategorySafely';
import { parseDate } from 'src/utils/parseDate';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ReviewCardData } from 'types/review';

import ImageDiv from './ImageDiv';

interface ReviewCardProps {
  reviewData: ReviewCardData;
  isHoverAvailable?: boolean;
  isMyReview?: boolean;
}

function ReviewCard(props: ReviewCardProps) {
  const { reviewData, isHoverAvailable, isMyReview } = props;
  const router = useRouter();
  const {
    image,
    shopName,
    category,
    content,
    date,
    likeCount,
    scrapCount,
    shopId,
    reviewId,
    writerThumbnail,
    writerName,
  } = reviewData;
  const [isHovered, setIsHovered] = useState(false);
  const likedCount = likeCount > 99 ? '99+' : likeCount;
  const savedCount = scrapCount > 99 ? '99+' : scrapCount;

  const getCurrentActivePage = () => {
    if (router.asPath.includes('/my/write')) return 'myWrite';
    if (router.asPath.includes('/my/scrap')) return 'myScrap';
    return 'shop';
  };

  const navigateToDetail = () => {
    if (shopId)
      router.push(
        `/review/detail/${reviewId}?shopId=${shopId}&reviewType=${getCurrentActivePage()}`,
      );
  };

  const toggleHeaderByIsMyReview = () => {
    if (isMyReview) return <p className="date">{parseDate(date)}</p>;
    return (
      <div className="profile">
        {writerThumbnail && <Image src={writerThumbnail} width={24} height={24} alt="profile" />}
        <p>{writerName}</p>
      </div>
    );
  };

  return (
    <StyledRoot
      onClick={navigateToDetail}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHoverAvailable && isHovered && (
        <StyledHover>
          <p>{shopName}</p>
          <p>{parseCategorySafely(category || '')}</p>
        </StyledHover>
      )}
      <ImageDiv
        className="thumbnail__image"
        src={loadImageSafely(image)}
        width={384}
        height={208}
        alt="thumbnail"
        placeholder="blur"
        blurDataURL={loadImageSafely(image)}
      />
      <StyledContents>
        <StyledHeader>
          {toggleHeaderByIsMyReview()}
          <div className="figure">
            <ImageDiv
              className="figure__icon"
              src={'/assets/ic_heart.svg'}
              width={15}
              height={13}
              alt="liked"
            />
            <p>{likedCount}</p>
            <ImageDiv
              className="figure__icon"
              src={'/assets/ic_save.svg'}
              width={12}
              height={14}
              alt="saved"
            />
            <p>{savedCount}</p>
          </div>
        </StyledHeader>
        <p>{content}</p>
      </StyledContents>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 38.4rem;
  height: 32rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  .thumbnail__image {
    & img {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
`;
const StyledHover = styled.div`
  position: absolute;
  z-index: 2;
  width: inherit;
  height: inherit;
  border-radius: 5px;
  background-color: rgba(81, 76, 87, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  p:first-child {
    font-size: 1.8rem;
    line-height: 2.6rem;
    font-weight: 500;
    margin: 0.7rem auto 0.4rem auto;
  }
  p:last-child {
    font-size: 1.2rem;
    line-height: 1.7rem;
    font-weight: 400;
  }
  animation: 0.3s linear appear;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const StyledContents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid ${theme.colors.gray2};
  border-top: none;
  padding: 1.6rem 2.4rem 2.3rem 2.4rem;
  margin-top: -0.2rem;
  & > p {
    height: 4.1rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 2.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  .date {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.3rem;
  }
  .profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      border-radius: 12px;
    }
    p {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2.3rem;
      margin-left: 0.8rem;
    }
  }
  .figure {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    p {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 2.2rem;
    }
    &__icon {
      display: flex;
      align-items: center;
      margin-right: 0.6rem;
      margin-left: 1rem;
    }
  }
`;

export default ReviewCard;
