import Banner from 'components/common/Banner';
import ThemeSelector from 'components/ThemeSelector';
import Head from 'next/head';
import MainBannerBtn from 'public/assets/main_banner_btn.svg';
import styled from 'styled-components';

function Home() {
  return (
    <>
      <Head>
        <title>소담, 소품샵 여정의 이야기를 담다</title>
        <meta name="description" content="소담, 소품샵 여정의 이야기를 담다" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Banner src="/assets/main_banner.svg">
          <BannerBtn />
        </Banner>
        <MarginWrapper>
          <ThemeSelector />
        </MarginWrapper>
      </Container>
    </>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const MarginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 18.75%;
`;

const BannerBtn = styled(MainBannerBtn)`
  position: absolute;
  bottom: 10rem;
  left: 18.75%;

  &:hover {
    cursor: pointer;
  }
`;

export default Home;
