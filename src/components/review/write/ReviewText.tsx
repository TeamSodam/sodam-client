import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface ReviewTextProps {
  text: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function ReviewText(props: ReviewTextProps) {
  const { text, handleTextChange } = props;

  return (
    <StyledRoot>
      <StyledTextArea
        value={text}
        onChange={handleTextChange}
        placeholder="소품샵에 대한 후기를 자유롭게 작성해 주세요! (최소 35자, 최대 500자)"
      />
      <p>{`(${text.length}/500자)`}</p>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 79.2rem;
  height: 26rem;
  background-color: ${theme.colors.grayBg};
  padding: 1.7rem 0.8rem;
  p {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${theme.colors.gray1};
    float: right;
    margin-right: 2.2rem;
  }
`;
const StyledTextArea = styled.textarea`
  width: 75.7rem;
  height: 20rem;
  outline: none;
  border: none;
  resize: none;
  font-family: 'Noto Sans KR';
  font-size: 1.4rem;
  font-weight: 500;
  background-color: ${theme.colors.grayBg};
  margin-left: 1.9rem;
  margin-top: 0.9rem;
  padding-right: 1.8rem;
  color: ${theme.colors.gray1};
  &::placeholder {
    color: ${theme.colors.gray1};
  }
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(140, 140, 149, 0.5);
    border-radius: 0.25rem;
    &:hover {
      background: ${theme.colors.gray1};
    }
  }
`;

export default ReviewText;
