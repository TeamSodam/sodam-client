import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: null,
    password: null,
  });
  const loginError = false;

  const handleChange = (e: ChangeEvent, inputType: string) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setLoginInfo({ ...loginInfo, [inputType]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('제출');
  };

  return (
    <StyledRoot>
      <h1>로그인</h1>
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        <span>ID(이메일)</span>
        <StyledInputDiv>
          <input type="email" onChange={(e) => handleChange(e, 'email')} />
        </StyledInputDiv>
        <span>PW</span>
        <StyledInputDiv>
          <input type="password" onChange={(e) => handleChange(e, 'password')} />
        </StyledInputDiv>
        {loginError ? (
          <StyledWarning>ID 또는 PW를 잘못 입력하셨습니다.</StyledWarning>
        ) : (
          <StyledWarning />
        )}
        <StyledLoginBtn type="submit">로그인</StyledLoginBtn>
      </StyledForm>
      <StyledLinkWrapper>
        <Link href="/">비밀번호 재설정</Link>
        <Link href="/auth/join">회원가입</Link>
      </StyledLinkWrapper>
    </StyledRoot>
  );
}

export default Login;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12rem;
  align-items: center;
  & > h1 {
    width: 39.1rem;
    font-weight: bold;
    font-size: 2.6rem;
    line-height: 3.8rem;
    margin-bottom: 4.5rem;
    color: ${theme.colors.purpleText};
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 39.1rem;
  & > span {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: ${theme.colors.black2};
  }
`;

const StyledInputDiv = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  background-color: white;
  border: 1px solid ${theme.colors.purpleText};
  border-radius: 5px;
  margin-top: 0.9rem;
  margin-bottom: 2rem;
  & > input {
    flex: 1;
    outline: 0;
    border: 0;
    color: ${theme.colors.gray1};
    font-size: 1.3rem;
    font-weight: 500;
    margin-left: 1.6rem;
  }
`;

const StyledLoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  border-radius: 5px;
  border: 0;
  outline: 0;
  margin-bottom: 2.8rem;
  background-color: ${theme.colors.purpleText};
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 5rem;
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  gap: 2.6rem;
  margin-bottom: 16.2rem;
  & > a {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.7rem;
    color: ${theme.colors.gray1};
    text-decoration: none;
  }
`;

const StyledWarning = styled.div`
  width: 100%;
  height: 2rem;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${theme.colors.purpleText};
  text-align: center;
  margin-top: 0.8rem;
  margin-bottom: 1.6rem;
`;
