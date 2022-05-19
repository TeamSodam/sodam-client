import { usePostNicknameMutation } from 'features/auth/authApi';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserSignupRequest } from 'types/auth';

interface SignupOptionProps {
  type: string;
  error: boolean;
  value: string;
  nicknameComplete: boolean;
  handleConfirm: (type: keyof UserSignupRequest, value: boolean) => void;
}
function SignupOption(props: SignupOptionProps) {
  const { type, error, value, handleConfirm, nicknameComplete } = props;
  const [nickname] = usePostNicknameMutation();
  const handleClick = async () => {
    if (value) {
      try {
        const { uniqueNickname } = await nickname({ nickname: value }).unwrap();
        handleConfirm('nickname', uniqueNickname);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          <StyledBtn
            onClick={handleClick}
            tabIndex={-1}
            inputType={type}
            disabled={error || nicknameComplete}
          >
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
