import PasswordChangeForm from 'components/Password/PasswordChangeForm';
import styled from 'styled-components';

function findPw() {
  return (
    <StyledRoot>
      <PasswordChangeForm />
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
