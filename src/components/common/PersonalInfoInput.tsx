import useInput from 'hooks/useInput';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface PersonalInfoInputProps {
  title: string;
}

function PersonalInfoInput(props: PersonalInfoInputProps) {
  const { title } = props;
  const inputValue = useInput();

  return (
    <StyledRoot>
      <StyledTitleWrapper>
        <span>{title}</span>
        {title === '닉네임' ? (
          <StyledBtn>중복확인</StyledBtn>
        ) : title === 'ID (이메일 인증번호)' ? (
          <StyledBtn>확인</StyledBtn>
        ) : (
          <div />
        )}
      </StyledTitleWrapper>
      <input type="text" {...inputValue} />
    </StyledRoot>
  );
}

export default PersonalInfoInput;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  & > input {
    width: 52.8rem;
    height: 5rem;
    background-color: white;
    border: 1px solid ${theme.colors.purpleText};
    border-radius: 5px;
    outline: 0;
    color: ${theme.colors.gray1};
    font-size: 1.3rem;
    font-weight: 500;
    padding-left: 1.6rem;
    margin-top: 0.5rem;
  }
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > span {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: ${({ theme }) => theme.colors.black2};
  }
  & > div {
    display: none;
  }
`;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.1rem;
  height: 2.2rem;
  border-radius: 5px;
  border: 0;
  outline: 0;
  background-color: ${theme.colors.purpleMain};
  color: ${theme.colors.grayBg};
  font-weight: 500;
  font-size: 1rem;
  line-height: 2.2rem;
`;
