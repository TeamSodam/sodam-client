import AcceptTerms from 'components/Auth/AcceptTerms';
import SignupForm from 'components/Auth/SignupForm';
import ThemeSelector from 'components/Auth/ThemeSelector';
import { usePostSignupMutation } from 'features/auth/authApi';
import { setToken } from 'features/users/userSlice';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserSignupRequest } from 'types/auth';

function Join() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [postSignup] = usePostSignupMutation();
  const [signupInfo, setSignupInfo] = useState<UserSignupRequest>({
    name: { value: null, isComplete: false },
    email: { value: null, isComplete: false },
    emailConfirm: { value: null, isComplete: false },
    password: { value: null, isComplete: false },
    passwordConfirm: { value: null, isComplete: false },
    nickname: { value: null, isComplete: false },
    themePreference: { value: [], isComplete: false },
  });

  const [isReady, setIsReady] = useState({ inputReady: false, agreeReady: false });

  const handleIsReady = useCallback((value: boolean) => {
    setIsReady((prevReadyState) => ({ ...prevReadyState, agreeReady: value }));
  }, []);

  const handleComplete = useCallback((type: keyof UserSignupRequest, isComplete: boolean) => {
    setSignupInfo((prevSignupInfo) => ({
      ...prevSignupInfo,
      [type]: { ...prevSignupInfo[type], isComplete },
    }));
  }, []);

  const handleOnChange = useCallback((type: keyof UserSignupRequest, value: string) => {
    setSignupInfo((prevSignupInfo) => ({
      ...prevSignupInfo,
      [type]: { ...prevSignupInfo[type], value },
    }));
  }, []);

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

  const handleSubmit = async () => {
    const signupForm = Object.entries(signupInfo)
      .filter(([type]) => type !== 'emailConfirm')
      .reduce((el, [type, info]) => ({ ...el, [type]: info.value }), {});
    try {
      const { accesstoken } = await postSignup(signupForm).unwrap();
      dispatch(setToken(accesstoken));
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (signupInfo.themePreference.value.length === 0) {
      handleComplete('themePreference', false);
    } else {
      handleComplete('themePreference', true);
    }
  }, [signupInfo.themePreference.value, handleComplete]);

  useEffect(() => {
    const inputReady = Object.entries(signupInfo).every(([, info]) => info.isComplete);
    if (!inputReady) return;
    setIsReady((prevReadyState) => ({ ...prevReadyState, inputReady }));
  }, [signupInfo]);

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
      <AcceptTerms handleIsReady={handleIsReady} />
      <StyledSumitBtn onClick={handleSubmit} disabled={!(isReady.agreeReady && isReady.inputReady)}>
        가입완료
      </StyledSumitBtn>
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
  background-color: ${theme.colors.purpleMain};
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 5rem;

  &:disabled {
    background-color: ${theme.colors.gray2};
    cursor: default;
  }
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
