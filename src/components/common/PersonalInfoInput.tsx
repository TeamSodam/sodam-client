import SignupOption from 'components/Auth/SignupOption';
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
        <h3>{title}</h3>
        <SignupOption type={title} />
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
  & > h3 {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: ${theme.colors.black2};
  }
  & > div {
    display: none;
  }
`;
