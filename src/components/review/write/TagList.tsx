import React, { useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

interface TagListProps {
  tag: string[];
  handleTagSubmit: (data: string) => void;
  handleTagDelete: (data: string) => void;
}

function TagList(props: TagListProps) {
  const { tag, handleTagSubmit, handleTagDelete } = props;

  const [input, setInput] = useState<string>('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let data = e.target.value;
    if (data.length > 8) {
      data = data.slice(0, 8);
    }
    setInput(data);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (e.key === ',' || e.key === 'Enter') {
      if (value === '' || value === ' ' || tag.includes(value)) {
        setInput('');
        return;
      }
      if (tag.length < 4) {
        handleTagSubmit(value);
        setInput('');
      }
    }
  };

  return (
    <StyledRoot>
      {tag &&
        tag.map((item) => (
          <StyledTag key={item} onClick={() => handleTagDelete(item)}>
            {item}
          </StyledTag>
        ))}
      <StyledInput
        type="text"
        value={input}
        onChange={handleTextChange}
        onKeyPress={handleSubmit}
        placeholder="#해시태그를 입력해주세요 (최대 8글자, 4개까지 추가 가능)"
      />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 79.2rem;
  height: 4rem;
  border-radius: 0.5rem;
  border: 0.15rem solid ${theme.colors.gray2};
  padding: 0.8rem 1.4rem;
  display: flex;
  align-items: center;
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 52.9rem;
    height: 2.8rem;
    padding: 0.5rem 1rem;
  }
  ${applyMediaQuery('mobile')} {
    width: 31.2rem;
    height: 3rem;
    padding: 0.6rem 1.2rem;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const StyledInput = styled.input`
  font-family: 'Noto Sans CJK KR';
  font-size: 1.4rem;
  font-weight: 500;
  color: ${theme.colors.gray1};
  border: none;
  flex: 1;
  &::placeholder {
    color: ${theme.colors.gray1};
  }
  &:focus {
    outline: none;
  }
  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    font-size: 1rem;
    min-width: 1rem;
  }
`;
const StyledTag = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 2rem;
  color: ${theme.colors.purpleText};
  padding: 0.1rem 0.9rem;
  height: 2.4rem;
  border: 0.1rem solid ${theme.colors.purpleText};
  border-radius: 3rem;
  margin-right: 0.8rem;
  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.purpleText};
    color: white;
  }

  &:before {
    content: '#';
  }

  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    font-size: 1rem;
    line-height: 1.6rem;
    padding: 0 0.7rem;
    height: 1.8rem;
    margin-right: 0.5rem;
  }
  ${applyMediaQuery('mobile')} {
    height: 1.7rem;
    line-height: 1.5rem;
    margin-right: 0;
    transform: scale(0.9);
    transform-origin: center left;
  }
`;

export default TagList;
