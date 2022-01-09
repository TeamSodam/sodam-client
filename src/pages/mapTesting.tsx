import useMap from 'hooks/useMap';
import Head from 'next/head';
import { useRef, useState } from 'react';
import styled from 'styled-components';

function MapTesting() {
  const mapRef = useRef(null);
  const [input, setInput] = useState('');
  const { displayMarkerByAddress, moveByAddress } = useMap(mapRef);
  return (
    <>
      <Head>
        <title>소담, 소품샵 여정의 이야기를 담다</title>
        <meta name="description" content="소담, 소품샵 여정의 이야기를 담다" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <button onClick={async () => await displayMarkerByAddress()}>마커 찍기</button>
        <input
          placeholder="ex) 서울 서초구 방배중앙로29길 7"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => moveByAddress(input)}>위치 이동</button>
        <MapContainer ref={mapRef} />
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
  gap: 1.5rem;
  background-color: #eeeeff;
`;

const MapContainer = styled.div`
  width: 500px;
  height: 500px;
`;

export default MapTesting;
