import styled from 'styled-components';

function MyPage() {
  return (
    <Container>
      <h1>아 더워 개더워</h1>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Container>
  );
}

const Container = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;

  & > div {
    background-color: red;
  }
`;

export default MyPage;
