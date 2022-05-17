import styled from 'styled-components';
import { theme } from 'styles/theme';

function AuthNumForm() {
  return (
    <StyledRoot>
      <StyledTitleWrapper>
        <h3>인증번호 입력</h3>
        <p>회원님의 이메일로 발송된 인증번호 네자리를 입력해주세요</p>
      </StyledTitleWrapper>
      <StyledInputWrapper>
        <input type="tel" maxLength={1} min="0" max="9" />
        <input type="tel" maxLength={1} min="0" max="9" />
        <input type="tel" maxLength={1} min="0" max="9" />
        <input type="tel" maxLength={1} min="0" max="9" />
      </StyledInputWrapper>
      <StyledWarningMessage>인증번호가 일치하지 않습니다.</StyledWarningMessage>
      <StyledOkBtn type="submit">확인</StyledOkBtn>
      <StyledResendBtn type="submit">인증번호 재발송</StyledResendBtn>
    </StyledRoot>
  );
}
const StyledRoot = styled.div`
  width: 39.1rem;
  height: 100%;
  padding: 12rem 0 9.8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 5.8rem;

  & > h3 {
    margin-bottom: 1.6rem;
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 3.8rem;
    color: ${theme.colors.purpleText};
  }

  & > p {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: ${theme.colors.black2};
  }
`;

const StyledInputWrapper = styled.div`
  width: 26.2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.2rem;

  & > input {
    width: 5.5rem;
    height: 7.1rem;
    border: 1px solid ${theme.colors.purpleText};
    border-radius: 5px;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.4rem;
    color: ${theme.colors.black2};
    text-align: center;
  }
`;

const StyledWarningMessage = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
  line-height: 2rem;
  margin-bottom: 1.6rem;
  color: ${theme.colors.purpleText};
`;

const StyledOkBtn = styled.button`
  width: 39.1rem;
  height: 4.6rem;
  margin-bottom: 1.6rem;
  background-color: ${theme.colors.gray2};
  border-radius: 5px;
  border: 0;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

const StyledResendBtn = styled.button`
  width: 39.1rem;
  height: 4.6rem;
  background-color: ${theme.colors.purpleMain};
  border-radius: 5px;
  border: 0;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

export default AuthNumForm;
