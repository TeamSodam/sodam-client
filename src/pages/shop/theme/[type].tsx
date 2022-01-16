import ThemeSelector from 'components/ThemeSelector';
import styled from 'styled-components';

function Theme() {
  return (
    <Container>
      <ThemeSelector />
    </Container>
  );
}

const Container = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Theme;
