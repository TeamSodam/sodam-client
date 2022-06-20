import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ReviewWriteKey } from 'types/review';

interface ReviewTextProps {
  content: string;
  handleDataChange: (data: string, key: Extract<ReviewWriteKey, 'content' | 'shopName'>) => void;
}

function ReviewText(props: ReviewTextProps) {
  const { content, handleDataChange } = props;

  return (
    <StyledRoot>
      <StyledTextArea
        value={content}
        onChange={(e) => handleDataChange(e.target.value, 'content')}
        placeholder="소품샵에 대한 후기를 자유롭게 작성해 주세요! (최소 35자, 최대 500자)"
      />
      <p>{`(${content.length}/500자)`}</p>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 79.2rem;
  height: 26rem;
  background-color: ${theme.colors.grayBg};
  padding: 1.7rem 0.8rem;
  margin-top: 1.2rem;
  margin-bottom: 1.6rem;
  p {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${theme.colors.gray1};
    float: right;
    margin-right: 2.2rem;
  }
  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    width: 52.9rem;
    height: 17.3rem;
    padding: 1.5rem;
    padding-bottom: 3.2rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    p {
      font-size: 1rem;
      line-height: 1.1rem;
      margin-right: 0;
      margin-top: 0.6rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    width: 31.2rem;
    height: 26rem;
    margin-top: 0%;
    p {
      line-height: 1.7rem;
    }
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
  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
    ::-webkit-scrollbar {
      width: 0.4rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    font-size: 1rem;
  }
`;

export default ReviewText;
