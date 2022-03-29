import PersonalInfoInput from 'components/common/PersonalInfoInput';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserSignupRequest } from 'types/user';

interface SignupFormProps {
  signupInfo: UserSignupRequest;
  handleOnChange: (type: keyof UserSignupRequest, value: string) => void;
  handleComplete: (type: keyof UserSignupRequest, value: boolean) => void;
}

function SignupForm(props: SignupFormProps) {
  const { signupInfo, handleOnChange, handleComplete } = props;
  const checkPassword = () => signupInfo.password.value !== signupInfo.passwordConfirm.value;

  const InfoList = Object.keys(signupInfo);

  useEffect(() => {
    handleComplete('passwordConfirm', !checkPassword());
  }, [checkPassword()]);

  const isKeyOfSignUpInfo = (inputType: string): inputType is keyof UserSignupRequest =>
    inputType in signupInfo;
  return (
    <StyledRoot>
      {InfoList.map((type, idx) => {
        if (idx === InfoList.length - 1) return;
        if (isKeyOfSignUpInfo(type)) {
          return (
            <PersonalInfoInput
              key={type}
              inputType={type}
              handleOnChange={handleOnChange}
              handleComplete={handleComplete}
              passwordError={checkPassword()}
              order={idx}
            />
          );
        }
      })}
      <StyledLine />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const StyledLine = styled.div`
  display: flex;
  order: 4;
  width: 59.1rem;
  height: 0.2rem;
  margin: 1.2rem 0 0 0.2rem;
  background-color: ${theme.colors.grayBg};
`;
export default SignupForm;
