import ThemeSelector from 'components/ThemeSelector';
import styled from 'styled-components';

function Theme() {
  return (
    <Container>
      <Wrapper>
        <ThemeWrapper>
          <ThemeSelector />
        </ThemeWrapper>
      </Wrapper>
      <Delimiter />
      <Wrapper />
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 7.2rem 18.75% 0 18.75%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const ThemeWrapper = styled.div`
  width: 100%;
  display: flex;
  height: calc(50.8rem - 7.2rem);
`;

const Delimiter = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.colors.navLine};
  padding: 0;
  margin: 0;
`;

export default Theme;
