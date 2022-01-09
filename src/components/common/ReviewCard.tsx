import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ReviewCardData } from 'types/review';

interface ReviewCardProps {
  reviewData: ReviewCardData;
}

function ReviewCard(props: ReviewCardProps) {
  const { reviewData } = props;
  const { thumbnail, text, writer, liked, saved } = reviewData;

  const likedCount = liked > 99 ? '99+' : liked;
  const savedCount = saved > 99 ? '99+' : saved;

  return (
    <StyledRoot>
      <StyledImageThumbnail>
        <Image src={thumbnail} width={384} height={208} alt="thumbnail" />
      </StyledImageThumbnail>
      <StyledContents>
        <StyledHeader>
          <div className="profile">
            <Image src={writer.thumbnail} width={24} height={24} alt="profile" />
            <p>{writer.name}</p>
          </div>
          <div className="figure">
            <StyledImageIcon>
              <Image src={'/assets/ic_heart.svg'} width={15} height={13} alt="liked" />
            </StyledImageIcon>
            <p>{likedCount}</p>
            <StyledImageIcon>
              <Image src={'/assets/ic_save.svg'} width={12} height={14} alt="saved" />
            </StyledImageIcon>
            <p>{savedCount}</p>
          </div>
        </StyledHeader>
        <p>{text}</p>
      </StyledContents>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 384px;
  height: 320px;
  border-radius: 5px;
`;
const StyledContents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid ${theme.colors.gray1};
  border-top: none;
  padding: 16px 24px 23px 24px;
  margin-top: -2px;
  & > p {
    height: 41px;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
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
  margin-bottom: 8px;
  .profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      border-radius: 12px;
    }
    p {
      font-size: 14px;
      font-weight: 500;
      line-height: 23px;
      margin-left: 8px;
    }
  }
  .figure {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
    }
  }
`;
const StyledImageThumbnail = styled.div`
  img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;
const StyledImageIcon = styled.div`
  margin-right: 6px;
  margin-left: 10px;
`;

export default ReviewCard;
