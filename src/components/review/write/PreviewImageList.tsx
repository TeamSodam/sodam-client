import Image from 'next/image';
import DeleteIcon from 'public/assets/ic_delete_round.svg';
import PlusIcon from 'public/assets/ic_img_plus.svg';
import React from 'react';
import shortId from 'shortid';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ReviewImage } from 'types/review';

interface PreviewImageListProps {
  reviewImageList: ReviewImage[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number) => void;
  changeMainImage: (index: number) => void;
}

function PreviewImageList(props: PreviewImageListProps) {
  const { reviewImageList, handleImageUpload, handleImageDelete, changeMainImage } = props;

  const MAX_NUM = 9;

  const imageList = [...reviewImageList];
  imageList.splice(0, 1);

  const emptyList =
    imageList.length === MAX_NUM ? [] : new Array<null>(MAX_NUM - imageList.length - 1).fill(null);

  if (!reviewImageList.length) return null;

  return (
    <StyledRoot>
      {imageList.map((image, index) => (
        <StyledImageCard key={shortId.generate()}>
          <Image
            src={image.preview ? image.preview : ''}
            width={75}
            height={75}
            alt={`review${index}`}
            onClick={() => changeMainImage(index + 1)}
          />
          <DeleteIcon onClick={() => handleImageDelete(index + 1)} />
        </StyledImageCard>
      ))}
      {imageList.length !== MAX_NUM && (
        <>
          <StyledEmptyCard>
            <PlusIcon />
          </StyledEmptyCard>
          <StyledInput
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e, reviewImageList.length)}
          />
        </>
      )}
      {emptyList.map(() => (
        <StyledEmptyCard key={shortId.generate()} />
      ))}
    </StyledRoot>
  );

const StyledRoot = styled.div`
  width: 75.5rem;
  height: 7.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledInput = styled.input`
  width: 7.5rem;
  height: 7.5rem;
  display: block;
  margin-left: -8.5rem;
  opacity: 0;
  &:hover {
    cursor: pointer;
  }
`;
const StyledImageCard = styled.div`
  width: 7.5rem;
  height: inherit;
  border-radius: 1rem;
  img {
    border-radius: 1rem;
  }
  svg {
    position: absolute;
    margin-top: 0.5rem;
    margin-left: -2.1rem;
    &:hover {
      cursor: pointer;
    }
    path:hover {
      fill: ${theme.colors.purpleText};
    }
  }
  &:hover {
    box-shadow: 0px 0px 0px 2px ${theme.colors.purpleText};
    cursor: pointer;
  }
`;
const StyledEmptyCard = styled.div`
  width: 7.5rem;
  height: inherit;
  border-radius: 1rem;
  background-color: ${theme.colors.grayBg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PreviewImageList;
