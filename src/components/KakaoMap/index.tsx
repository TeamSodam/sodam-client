import Head from 'next/head';
import Script from 'next/script';
import { PropsWithChildren, RefObject } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

interface KakaoMapProps {
  mapType: keyof typeof ContainerTypeMap;
  initialize: () => void;
  mapRef: RefObject<HTMLDivElement>;
  fallbackOptions?: {
    shouldFallback: boolean;
    fallbackUI: JSX.Element | string;
  };
}

function KakaoMap(props: PropsWithChildren<KakaoMapProps>) {
  const { initialize, children, mapType, mapRef, fallbackOptions } = props;
  const KakakMapContainer = ContainerTypeMap[mapType];

  const renderFallback = () => {
    if (!fallbackOptions?.shouldFallback) return;

    return (
      <MapFallbackUI>
        <p>{fallbackOptions.fallbackUI}</p>
        <b>관리자에게 문의해주세요.</b>
      </MapFallbackUI>
    );
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
      </Head>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        onLoad={() => window.kakao?.maps?.load(initialize)}
      />
      <KakakMapContainer ref={mapRef}>
        <>
          {children}
          {renderFallback()}
        </>
      </KakakMapContainer>
    </>
  );
}

const MapFallbackUI = styled.div`
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);
  color: white;

  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > b {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`;

const ContainerTypeMap = {
  mapDetail: styled.div`
    width: 100%;
    height: 82.4rem;

    position: relative;

    margin: 3.5rem 0 13.2rem 0;

    ${applyMediaQuery('desktop')} {
      height: 55rem;
      margin: 3.5rem 0 10rem 0;
    }

    ${applyMediaQuery('tablet')} {
      height: 36rem;
      margin: 1.1rem 0 0 0;
    }

    ${applyMediaQuery('mobile')} {
      height: 29rem;
      margin: 1.1rem 0 0 0;

      & img[title] {
        transform: scale(0.7);
      }
    }
  `,
  shopDetail: styled.div`
    width: 100%;
    height: 32rem;

    position: relative;

    ${applyMediaQuery('desktop')} {
      height: 21.3rem;

      & img[title] {
        transform: scale(0.85) translateX(7.5%);
      }
    }

    ${applyMediaQuery('tablet')} {
      height: 18rem;
      & img[title] {
        transform: scale(0.75) translateX(12.5%);
      }
    }

    ${applyMediaQuery('mobile')} {
      height: 13.5rem;

      & img[title] {
        transform: scale(0.55) translate(20%, 25px);
      }
    }
  `,
};

export default KakaoMap;
