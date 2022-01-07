import useMap from 'hooks/useMap';
import Head from 'next/head';
import { useRef, useState } from 'react';
import styled from 'styled-components';

function Home() {
  const tmpMap = useRef(null);
  const [input, setInput] = useState('');
  const { displayMarkerByAddress } = useMap(tmpMap);
  return (
    <>
      <Head>
        <title>소담, 소품샵 여정의 이야기를 담다</title>
        <meta name="description" content="소담, 소품샵 여정의 이야기를 담다" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>소담,</h1>
        <h2>🎁 소품샵 여정의 이야기를 담다 🎁</h2>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={async () => await displayMarkerByAddress(input)}>마커 찍기</button>
        <MapContainer ref={tmpMap} />
      </Container>
    </>
  );
}

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  background-color: #eeeeff;
  & > h1 {
    font-size: 5rem;
    color: #9796fe;
    font-weight: bolder;
  }

  & > h2 {
    font-size: 3.5rem;
    color: #9796fe;
  }
`;

const MapContainer = styled.div`
  width: 350px;
  height: 350px;
`;

export default Home;
