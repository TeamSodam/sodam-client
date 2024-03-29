import ImageDiv from 'components/common/ImageDiv';
import IcDeleteRound from 'components/Icons/IcDeleteRound';
import React from 'react';
import shortId from 'shortid';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
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
          <ImageDiv
            className="image-preview"
            src={image.preview ? image.preview : ''}
            layout="fill"
            alt={`review${index}`}
            onClick={() => changeMainImage(index + 1)}
          />
          <IcDeleteRound
            width={16}
            height={16}
            color="white"
            onClick={() => handleImageDelete(index + 1)}
          />
        </StyledImageCard>
      ))}
      {imageList.length !== MAX_NUM && (
        <>
          <StyledEmptyCard>
            <ImageDiv
              className="plus-icon"
              src={'/assets/ic_img_plus.svg'}
              layout="fill"
              alt="plus"
            />
          </StyledEmptyCard>
          <StyledInput type="file" accept="image/*" multiple onChange={handleImageUpload} />
        </>
      )}
      {emptyList.map(() => (
        <StyledEmptyCard key={shortId.generate()} />
      ))}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 75.5rem;
  height: 7.5rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.9rem;
  .plus-icon {
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
  }
  .image-preview {
    position: relative;
    width: 7.5rem;
    height: 7.5rem;
  }
  input::file-selector-button {
    width: 0;
    height: 0;
  }
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 50.3rem;
    height: 5rem;
    padding-bottom: 0;
    .plus-icon {
      width: 1.1rem;
      height: 1.1rem;
    }
    .image-preview {
      width: 5rem;
      height: 5rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    width: 31.2rem;
    height: 11.8rem;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem;
    padding-bottom: 0;
    margin-bottom: 1.1rem;
    .plus-icon {
      width: 1.5rem;
      height: 1.5rem;
    }
    .image-preview {
      width: 5.4rem;
      height: 5.4rem;
    }
  }
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
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 5rem;
    height: 5rem;
    margin-left: -5.6rem;
  }
  ${applyMediaQuery('mobile')} {
    width: 5.4rem;
    height: 5.4rem;
    position: relative;
    margin-left: -6.4rem;
  }
`;
const StyledImageCard = styled.div`
  width: 7.5rem;
  height: inherit;
  border-radius: 1rem;
  img {
    border-radius: 1rem;
    object-fit: cover;
  }
  button {
    transform: translate(3.1rem, -4.7rem);
  }
  svg path:hover {
    fill: ${theme.colors.purpleText};
  }
  &:hover {
    box-shadow: 0px 0px 0px 2px ${theme.colors.purpleText};
    cursor: pointer;
  }
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 5rem;
  }
  ${applyMediaQuery('mobile')} {
    width: 5.4rem;
    height: 5.4rem;
    button {
      transform: translate(3.4rem, -5rem);
    }
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
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 5rem;
  }
  ${applyMediaQuery('mobile')} {
    width: 5.4rem;
    height: 5.4rem;
  }
`;

export default PreviewImageList;
