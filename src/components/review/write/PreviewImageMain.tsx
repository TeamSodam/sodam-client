import ImageDiv from 'components/common/ImageDiv';
import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ReviewImage } from 'types/review';

interface PreviewImageMainProps {
  mainImage: ReviewImage;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number) => void;
}

function PreviewImageMain(props: PreviewImageMainProps) {
  const { mainImage, handleImageUpload, handleImageUpdate, handleImageDelete } = props;

  return (
    <StyledRoot>
      {mainImage ? (
        <StyledPreview>
          <ImageDiv
            className="image-preview"
            src={mainImage.preview ? mainImage.preview : ''}
            layout="fill"
            alt="preview"
          />
          <StyledIcons>
            <ImageDiv
              className="main-icon"
              src={'/assets/ic_img_main.svg'}
              layout="fill"
              alt="main"
            />
            <div>
              <ImageDiv
                className="replace-icon"
                src={'/assets/ic_img_replace.svg'}
                layout="fill"
                alt="replace"
              />
              <StyledReplace type="file" accept="image/*" onChange={handleImageUpdate} />
              <ImageDiv
                className="delete-icon"
                src={'/assets/ic_img_delete.svg'}
                onClick={() => handleImageDelete(0)}
                layout="fill"
                alt="delete"
              />
            </div>
          </StyledIcons>
        </StyledPreview>
      ) : (
        <StyledEmpty>
          <ImageDiv
            className="camera-icon"
            src={'/assets/ic_camera.svg'}
            layout="fill"
            alt="camera"
          />
          <p>사진을 업로드 해 주세요!</p>
          <p>(최소 1장, 최대 10장)</p>
        </StyledEmpty>
      )}
      <StyledInput type="file" accept="image/*" multiple onChange={handleImageUpload} />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 28.2rem;
  height: 24.6rem;
  input[type='file'],
  input[type='file']::-webkit-file-upload-button {
    cursor: pointer;
  }
  .image-preview {
    position: relative;
    width: 28.2rem;
    height: 24.6rem;
  }
  .camera-icon {
    position: relative;
    width: 5rem;
    height: 3.8rem;
  }
  .main-icon {
    position: relative;
    width: 5rem;
    height: 2.4rem;
  }
  .replace-icon {
    position: relative;
    width: 2rem;
    height: 2rem;
  }
  .delete-icon {
    position: relative;
    width: 1.8rem;
    height: 2rem;
    &:hover {
      cursor: pointer;
    }
  }
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 18.8rem;
    height: 16.4rem;
    .image-preview {
      width: 18.8rem;
      height: 16.4rem;
    }
    .camera-icon {
      width: 3.3rem;
      height: 2.5rem;
    }
    .main-icon {
      width: 3.3rem;
      height: 1.6rem;
    }
    .replace-icon {
      width: 1.4rem;
      height: 1.4rem;
    }
    .delete-icon {
      width: 1.2rem;
      height: 1.4rem;
      margin-left: 1rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    width: 31.2rem;
    height: 24.8rem;
    margin-bottom: 0.8rem;
    .image-preview {
      width: 31.2rem;
      height: 24.8rem;
    }
    .camera-icon {
      width: 4.8rem;
      height: 3.7rem;
    }
    .main-icon {
      width: 4.3rem;
    }
    .replace-icon {
      width: 2rem;
      height: 2rem;
    }
    .delete-icon {
      width: 2rem;
      height: 2rem;
      margin-left: 1.5rem;
    }
  }
`;
const StyledIcons = styled.div`
  position: relative;
  z-index: 2;
  width: inherit;
  height: inherit;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: -24.6rem;
  div {
    display: flex;
    justify-content: flex-end;
    & svg {
      margin-left: 16px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  ${applyMediaQuery('desktop', 'tablet')} {
    padding: 0.9rem;
    margin-top: -16.4rem;
    div svg {
      margin-left: 10px;
    }
  }
  ${applyMediaQuery('mobile')} {
    margin-top: -24.8rem;
  }
`;
const StyledReplace = styled.input`
  width: 2rem;
  display: block;
  position: relative;
  z-index: 3;
  margin-left: -2rem;
  opacity: 0;
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 1.4rem;
    height: 1.4rem;
    margin-left: -1.4rem;
  }
`;
const StyledInput = styled.input`
  width: inherit;
  height: inherit;
  display: block;
  margin-top: -24.6rem;
  opacity: 0;
  ${applyMediaQuery('desktop', 'tablet')} {
    margin-top: -16.4rem;
  }
  ${applyMediaQuery('mobile')} {
    margin-top: -24.8rem;
  }
`;
const StyledPreview = styled.div`
  width: inherit;
  height: inherit;
  img {
    border-radius: 0.5rem;
  }
`;
const StyledEmpty = styled.div`
  width: inherit;
  height: inherit;
  border-radius: 0.5rem;
  padding-top: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grayBg};
  color: ${theme.colors.gray1};
  & p:nth-child(2) {
    font-size: 1.4rem;
    font-weight: bold;
    margin-top: 1.3rem;
    margin-bottom: 0.4rem;
  }
  & p:nth-child(3) {
    font-size: 1.2rem;
    font-weight: 500;
  }
  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    padding-top: 0;
    & p:nth-child(2) {
      font-size: 1rem;
      margin-top: 0.7rem;
      margin-bottom: 0.3rem;
    }
    & p:nth-child(3) {
      font-size: 1rem;
      transform: scale(0.8);
    }
  }
  ${applyMediaQuery('mobile')} {
    & p:nth-child(2) {
      margin-top: 1.6rem;
      margin-bottom: 0.4rem;
    }
  }
`;

export default PreviewImageMain;
