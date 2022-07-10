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
  isEmailConfirmSent: boolean;
}
function SignupOption(props: SignupOptionProps) {
  const { type, error, value, handleConfirm, isCompleteList, isEmailConfirmSent } = props;
  const [checkNickname] = usePostNicknameMutation();
  const [checkEmail] = usePostEmailMutation();

  const handleClick = async () => {
    if (type === 'nickname') {
      try {
        const { uniqueNickname } = await checkNickname({ nickname: value }).unwrap();
        handleConfirm(type, uniqueNickname);
      } catch (error) {
        console.log(error);
      }
    } else if (type === 'email') {
      try {
        const { uniqueEmail, verificationCode } = await checkEmail({ email: value }).unwrap();
        handleConfirm(type, uniqueEmail);
        localStorage.setItem('verificationCode', verificationCode);
      } catch (error) {
        console.log(error);
      }
    } else if (type === 'emailConfirm') {
      const verificationCode = localStorage.getItem('verificationCode');
      handleConfirm(type, value === verificationCode);
      if (value === verificationCode) {
        localStorage.removeItem('verificationCode');
      }
    }
  };

  const getSignOption = (type: string) => {
    switch (type) {
      case 'email':
        return {
          disabled: error,
          label: isEmailConfirmSent ? '인증번호 재전송' : '인증번호 전송',
        };
      case 'nickname':
        return {
          disabled: error || isCompleteList.nickname,
          label: '중복확인',
        };
      case 'emailConfirm':
        return {
          disabled: error || isCompleteList.emailConfirm,
          label: '확인',
        };
      default:
        return null;
    }
  };

  const currentOption = getSignOption(type);

  if (!currentOption) return null;

  const { disabled, label } = currentOption;

  return (
    <StyledBtn onClick={handleClick} tabIndex={-1} inputType={type} disabled={disabled}>
      {label}
    </StyledBtn>
  );
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
