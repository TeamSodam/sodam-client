import NewPasswordForm from 'components/Password/NewPasswordForm';
import styled from 'styled-components';

function findPw() {
  return (
    <StyledRoot>
      <NewPasswordForm />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  height: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default findPw;
