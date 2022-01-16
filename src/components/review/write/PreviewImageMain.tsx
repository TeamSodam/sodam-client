import Image from 'next/image';
import CameraIcon from 'public/assets/ic_camera.svg';
import DeleteIcon from 'public/assets/ic_img_delete.svg';
import MainIcon from 'public/assets/ic_img_main.svg';
import ReplaceIcon from 'public/assets/ic_img_replace.svg';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface ReviewImage {
  file: File | null;
  preview: string | null;
}
interface PreviewImageMainProps {
  reviewImage: ReviewImage;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: () => void;
}

function PreviewImageMain(props: PreviewImageMainProps) {
  const { reviewImage, handleImageUpload, handleImageDelete } = props;

  return (
    <StyledRoot>
      {reviewImage.preview ? (
        <StyledPreview>
          <Image src={reviewImage.preview} width={282} height={246} alt="preview" />
          <StyledIcons>
            <MainIcon />
            <div>
              <ReplaceIcon />
              <StyledReplace type="file" accept="image/*" onChange={handleImageUpload} />
              <DeleteIcon onClick={handleImageDelete} />
            </div>
          </StyledIcons>
        </StyledPreview>
      ) : (
        <StyledEmpty>
          <CameraIcon />
          <p>사진을 업로드 해 주세요!</p>
          <p>(최소 1장, 최대 10장)</p>
        </StyledEmpty>
      )}
      <StyledInput type="file" accept="image/*" onChange={handleImageUpload} />
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
`;
const StyledReplace = styled.input`
  width: 2rem;
  display: block;
  position: relative;
  z-index: 3;
  margin-left: -2rem;
  opacity: 0;
`;
const StyledInput = styled.input`
  width: inherit;
  height: inherit;
  display: block;
  margin-top: -24.6rem;
  opacity: 0;
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
`;

export default PreviewImageMain;
