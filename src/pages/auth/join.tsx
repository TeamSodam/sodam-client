import SignupForm from 'components/Auth/SignupForm';
import ThemeSelector from 'components/Auth/ThemeSelector';
import styled from 'styled-components';
import { theme } from 'styles/theme';

function Join() {
  return (
    <StyledRoot>
      <h1>회원가입</h1>
      <SignupForm />
      <ThemeSelector />
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
    font-weight: bold;
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
  margin-top: 9.3rem;
  background-color: ${theme.colors.purpleText};
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 5rem;
`;
export default Join;
