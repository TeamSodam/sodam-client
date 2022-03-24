import PersonalInfoInput from 'components/common/PersonalInfoInput';
import React, { useState } from 'react';
import styled from 'styled-components';

function SignupForm() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    nickname: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
  });

  const handleOnChange = (type: string, value: string) => {
    setSignupInfo({ ...signupInfo, [type]: value });
  };

  const checkPassword = () => signupInfo.password !== signupInfo.passwordConfirm;

  return (
    <StyledRoot>
      {Object.keys(signupInfo).map((type) => (
        <PersonalInfoInput
          key={type}
          inputType={type}
          handleOnChange={handleOnChange}
          passwordError={checkPassword()}
        />
      ))}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;
export default SignupForm;
