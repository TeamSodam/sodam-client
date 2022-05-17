import AuthNumForm from 'components/Password/AuthNumForm';
import styled from 'styled-components';

function findPw() {
  return (
    <StyledRoot>
      <AuthNumForm />
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
