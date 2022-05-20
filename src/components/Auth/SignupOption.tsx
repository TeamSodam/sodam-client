import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface SignupOptionProps {
  type: string;
  error: boolean;
}
function SignupOption(props: SignupOptionProps) {
  const { type, error } = props;

  const getSignOption = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <StyledBtn tabIndex={-1} inputType={type} disabled={error}>
            인증번호 전송
          </StyledBtn>
        );
      case 'nickname':
        return (
          <StyledBtn tabIndex={-1} inputType={type}>
            중복확인
          </StyledBtn>
        );
      case 'emailConfirm':
        return (
          <StyledBtn tabIndex={-1} inputType={type} disabled={error}>
            확인
          </StyledBtn>
        );
      default:
        return null;
    }
  };

  return getSignOption(type);
}

const StyledBtn = styled.button<{ inputType: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ inputType }) => inputType !== 'email' && '6.1rem'};
  padding: 0 ${({ inputType }) => inputType === 'email' && '1.1rem'};
  height: 2.2rem;
  border-radius: 5px;
  border: 0;
  outline: 0;
  background-color: ${theme.colors.purpleMain};
  color: white;
  font-weight: 500;
  font-size: 1rem;
  line-height: 2.2rem;
  margin-right: 1.2rem;
  &:disabled {
    background-color: ${theme.colors.gray2};
    cursor: default;
  }
`;

export default SignupOption;
