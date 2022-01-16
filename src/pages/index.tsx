import Banner from 'components/common/Banner';
import ThemeSelector from 'components/ThemeSelector';
import Head from 'next/head';
import Link from 'next/link';
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
          <Link href="/shop/theme/아기자기한" passHref>
            <BannerBtn />
          </Link>
        </Banner>
        <MarginWrapper>
          <LabelContentWrapper>
            <Label>
              <em>소푸미</em>님, 이 소품샵은 어떠세요?
            </Label>
          </LabelContentWrapper>
          <LabelContentWrapper>
            <Label>오늘의 소품샵 리뷰</Label>
          </LabelContentWrapper>
          <ThemeSelector />
          <LabelContentWrapper>
            <Label>
              주간 <em>HOT</em> 소품샵
            </Label>
          </LabelContentWrapper>
          <LabelContentWrapper>
            <Label>
              <em>인테리어 소품</em> 소품샵 리스트
            </Label>
          </LabelContentWrapper>
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

const Label = styled.h2`
  font-size: 3rem;
  line-height: 4.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black2};

  & > em {
    color: ${({ theme }) => theme.colors.purpleText};
  }
`;

const LabelContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default Home;
