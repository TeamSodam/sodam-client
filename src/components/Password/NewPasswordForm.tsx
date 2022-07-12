import styled from 'styled-components';
import { theme } from 'styles/theme';

function NewPasswordForm() {
  return (
    <StyledRoot>
      <StyledTitleWrapper>
        <h3>비밀번호를 변경해주세요!</h3>
      </StyledTitleWrapper>
      <StyledExplain>
        <p>안전한 사용을 위하여, 기존 비밀번호를 변경해야 합니다</p>
        <p>아래에 새 비밀번호를 입력해주세요</p>
      </StyledExplain>
      <StyledForm>
        <p>‘영문, 숫자’ 포함하여 8글자 이상 15자 미만</p>
        <input placeholder="새 비밀번호" />
        <input placeholder="새 비밀번호 확인" />
      </StyledForm>
      <StyledAlert>입력 형식에 맞지 않습니다</StyledAlert>
      <StyledButton type="submit">변경 완료</StyledButton>
    </StyledRoot>
  );
}

const StyledRoot = styled.section`
  width: 39.1rem;
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
  margin-bottom: 3.5rem;
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
    margin-bottom: 1.6rem;
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
    text-align: right;
    font-size: 1rem;
    margin-bottom: 0.9rem;
    line-height: 2rem;
    color: ${theme.colors.purpleText};
  }
`;

const StyledAlert = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 1.5rem;
  line-height: 2rem;
  color: ${theme.colors.purpleText};
`;

const StyledButton = styled.button`
  width: 100%;
  height: 4.6rem;
  margin-top: 1.6rem;
  background-color: ${theme.colors.gray2};
  border-radius: 5px;
  border: 0;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

export default NewPasswordForm;
