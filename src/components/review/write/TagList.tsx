import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface TagListProps {
  tags: string[];
  handleTagSubmit: (data: string) => void;
  handleTagDelete: (data: string) => void;
}

function TagList(props: TagListProps) {
  const { tags, handleTagSubmit, handleTagDelete } = props;

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
      if (value === '' || value === ' ' || tags.includes(value)) {
        setInput('');
        return;
      }
      if (tags.length < 4) {
        handleTagSubmit(value);
        setInput('');
      }
    }
  };

  return (
    <StyledRoot>
      {tags &&
        tags.map((tag) => (
          <StyledTag key={tag} onClick={() => handleTagDelete(tag)}>
            {tag}
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
`;
const StyledInput = styled.input`
  font-family: 'Noto Sans KR';
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
`;

export default TagList;
