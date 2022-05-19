import { usePostEmailMutation, usePostNicknameMutation } from 'features/auth/authApi';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserSignupRequest } from 'types/auth';

interface SignupOptionProps {
  type: string;
  error: boolean;
  value: string;
  isCompleteList: { [key: string]: boolean };
  handleConfirm: (type: keyof UserSignupRequest, value: boolean) => void;
}
function SignupOption(props: SignupOptionProps) {
  const { type, error, value, handleConfirm, isCompleteList } = props;
  const [nickname] = usePostNicknameMutation();
  const [email] = usePostEmailMutation();
  const handleClick = async () => {
    if (type === 'nickname') {
      try {
        const { uniqueNickname } = await nickname({ nickname: value }).unwrap();
        handleConfirm(type, uniqueNickname);
      } catch (error) {
        console.log(error);
      }
    } else if (type === 'email') {
      try {
        const { uniqueEmail, verificationCode } = await email({ email: value }).unwrap();
        handleConfirm(type, uniqueEmail);
        localStorage.setItem('verificationCode', verificationCode);
        console.log(uniqueEmail, verificationCode);
      } catch (error) {
        const { uniqueEmail } = error.data.data;
        handleConfirm(type, uniqueEmail);
      }
    } else if (type === 'emailConfirm') {
      const verificationCode = localStorage.getItem('verificationCode');
      handleConfirm(type, value === verificationCode);
      localStorage.removeItem('verificationCode');
    }
  };

  const getSignOption = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <StyledBtn onClick={handleClick} tabIndex={-1} inputType={type} disabled={error}>
            인증번호 전송
          </StyledBtn>
        );
      case 'nickname':
        return (
          <StyledBtn
            onClick={handleClick}
            tabIndex={-1}
            inputType={type}
            disabled={error || isCompleteList.nickname}
          >
            중복확인
          </StyledBtn>
        );
      case 'emailConfirm':
        return (
          <StyledBtn
            onClick={handleClick}
            tabIndex={-1}
            inputType={type}
            disabled={error || isCompleteList.emailConfirm}
          >
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
