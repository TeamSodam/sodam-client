import PersonalInfoInput from 'components/common/PersonalInfoInput';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { UserSignupRequest } from 'types/auth';

interface SignupFormProps {
  signupInfo: UserSignupRequest;
  handleOnChange: (type: keyof UserSignupRequest, value: string) => void;
  handleComplete: (type: keyof UserSignupRequest, value: boolean) => void;
}

function SignupForm(props: SignupFormProps) {
  const { signupInfo, handleOnChange, handleComplete } = props;
  const isPasswordEqual = signupInfo.password.value === signupInfo.passwordConfirm.value;
  const isCompleteList = {
    nickname: signupInfo.nickname.isComplete,
    email: signupInfo.email.isComplete,
    emailConfirm: signupInfo.emailConfirm.isComplete,
  };

  useEffect(() => {
    if (signupInfo.passwordConfirm.value && isPasswordEqual)
      handleComplete('passwordConfirm', true);
  }, [isPasswordEqual, handleComplete, signupInfo.passwordConfirm.value]);

  const isKeyOfSignUpInfo = (inputType: string): inputType is keyof UserSignupRequest =>
    inputType in signupInfo;

  const InfoList = Object.keys(signupInfo).slice(0, -1).filter(isKeyOfSignUpInfo);

  return (
    <StyledRoot>
      {InfoList.map((type, idx) => (
        <PersonalInfoInput
          key={type}
          inputType={type}
          handleOnChange={handleOnChange}
          handleComplete={handleComplete}
          passwordError={signupInfo.passwordConfirm.value && !isPasswordEqual}
          order={idx}
          isCompleteList={isCompleteList}
        />
      ))}
      <StyledLine />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 100%;
  ${applyMediaQuery('mobile', 'tablet')} {
    gap: 1rem;
  }
`;

const StyledLine = styled.div`
  display: flex;
  order: 4;
  width: 59.1rem;
  height: 0.2rem;
  margin: 1.9rem 0 4rem 0;
  background-color: ${theme.colors.grayBg};

  ${applyMediaQuery('mobile', 'tablet')} {
    height: 0.1rem;
    width: 100%;
    margin: 1.6rem 0 3rem 0;
  }
`;
export default SignupForm;
