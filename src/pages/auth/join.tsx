import SignupForm from 'components/Auth/SignupForm';
import ThemeSelector from 'components/Auth/ThemeSelector';
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserSignupRequest } from 'types/user';

function Join() {
  const [signupInfo, setSignupInfo] = useState<UserSignupRequest>({
    name: { value: '', isComplete: false },
    email: { value: '', isComplete: false },
    emailConfirm: { value: '', isComplete: false },
    password: { value: '', isComplete: false },
    passwordConfirm: { value: '', isComplete: false },
    nickname: { value: '', isComplete: false },
    themePreference: { value: [], isComplete: false },
  });

  console.log(signupInfo);

  const handleComplete = (type: keyof UserSignupRequest, value: boolean) => {
    setSignupInfo({ ...signupInfo, [type]: { ...signupInfo[type], isComplete: value } });
  };

  const handleOnChange = (type: keyof UserSignupRequest, value: string) => {
    setSignupInfo({ ...signupInfo, [type]: { ...signupInfo[type], value } });
  };

  const handleOnClick = (value: string) => {
    if (signupInfo.themePreference.value.includes(value)) {
      setSignupInfo({
        ...signupInfo,
        themePreference: {
          ...signupInfo.themePreference,
          value: signupInfo.themePreference.value.filter((themeValue) => themeValue !== value),
        },
      });
    } else {
      setSignupInfo({
        ...signupInfo,
        themePreference: {
          ...signupInfo.themePreference,
          value: [...signupInfo.themePreference.value, value],
        },
      });
    }
  };

  return (
    <StyledRoot>
      <h1>회원가입</h1>
      <SignupForm
        signupInfo={signupInfo}
        handleOnChange={handleOnChange}
        handleComplete={handleComplete}
      />
      <ThemeSelector handleOnClick={handleOnClick} />
      <StyledSumitBtn>가입완료</StyledSumitBtn>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 11rem;
  align-items: center;

  & > h1 {
    width: 52.8rem;
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 3.8rem;
    margin-bottom: 4.5rem;
    color: ${theme.colors.purpleText};
  }
`;
const StyledSumitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52.8rem;
  height: 5rem;
  border-radius: 5px;
  border: 0;
  outline: 0;
  margin: 9.3rem 0 12rem 0;
  background-color: ${theme.colors.gray2};
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 5rem;
`;
export default Join;
