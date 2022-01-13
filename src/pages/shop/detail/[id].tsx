import { useRouter } from 'next/router';
import styled from 'styled-components';

function Detail() {
  const router = useRouter();
  const { id } = router.query;

  return <Container>{`👻 shopId = ${id} 의 상세페이지에요!`}</Container>;
}

const Container = styled.main`
  font-size: 3rem;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Detail;
