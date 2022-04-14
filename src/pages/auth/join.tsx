import AcceptTerms from 'components/Auth/AcceptTerms';
import SignupForm from 'components/Auth/SignupForm';
import ThemeSelector from 'components/Auth/ThemeSelector';
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserSignupRequest } from 'types/user';

function Join() {
  const [signupInfo, setSignupInfo] = useState<UserSignupRequest>({
    name: { value: null, isComplete: false },
    email: { value: null, isComplete: false },
    emailConfirm: { value: null, isComplete: false },
    password: { value: null, isComplete: false },
    passwordConfirm: { value: null, isComplete: false },
    nickname: { value: null, isComplete: false },
    themePreference: { value: [], isComplete: false },
  });

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
      <StyledTitleWrapper>
        <h1>회원가입</h1>
        <span>*는 필수 입력 항목입니다</span>
      </StyledTitleWrapper>
      <SignupForm
        signupInfo={signupInfo}
        handleOnChange={handleOnChange}
        handleComplete={handleComplete}
      />
      <ThemeSelector handleOnClick={handleOnClick} />
      <AcceptTerms />
      <StyledSumitBtn>가입완료</StyledSumitBtn>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 11rem;
  align-items: center;
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
  margin: 9rem 0 12rem 0;
  background-color: ${theme.colors.gray2};
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 5rem;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  width: 52.8rem;
  justify-content: space-between;
  margin-bottom: 4.5rem;

  & > h1 {
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 3.8rem;
    color: ${theme.colors.purpleText};
  }
  & > span {
    display: flex;
    align-items: flex-end;
    font-size: 1.2rem;
    line-height: 1.7rem;
    font-weight: 500;
    color: ${theme.colors.purpleText};
  }
`;
export default Join;
