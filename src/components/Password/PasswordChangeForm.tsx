import styled from 'styled-components';
import { theme } from 'styles/theme';

function PasswordChangeForm() {
  return (
    <StyledRoot>
      <StyledTitleWrapper>
        <h3>비밀번호를 잊어버리셨나요?</h3>
      </StyledTitleWrapper>
      <StyledExplain>
        <p>소담에 가입했던 이메일을 입력해주세요</p>
        <p>비밀번호 재설정에 필요한 인증번호를 전송해드립니다</p>
      </StyledExplain>
      <StyledForm>
        <input placeholder="example@naver.com" />
        <p>존재하지 않는 이메일입니다</p>
        <button type="submit">인증번호 발송</button>
      </StyledForm>
    </StyledRoot>
  );
}

const StyledRoot = styled.section`
  width: 39.1rem;
  height: 100%;
  padding: 12rem 0 16rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.6rem;

  & > h3 {
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 3.8rem;
    color: ${theme.colors.purpleText};
  }
`;

const StyledExplain = styled.div`
  margin-bottom: 5.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  & > p {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: ${theme.colors.black2};
  }
`;

const StyledForm = styled.form`
  width: 100%;

  & > input {
    width: 100%;
    height: 5rem;
    margin-bottom: 2.8rem;
    background-color: white;
    border: 1px solid ${theme.colors.purpleText};
    border-radius: 5px;
    font-size: 1.3rem;
    font-weight: 500;
    padding-left: 1.6rem;
    color: ${theme.colors.black2};

    & ::placeholder {
      color: ${theme.colors.gray1};
    }
  }

  & > p {
    text-align: center;
    font-size: 1.4rem;
    margin-bottom: 1.6rem;
    line-height: 2rem;
    color: ${theme.colors.purpleText};
  }

  & > button {
    width: 100%;
    height: 4.6rem;
    background-color: ${theme.colors.gray2};
    border-radius: 5px;
    border: 0;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

export default PasswordChangeForm;
