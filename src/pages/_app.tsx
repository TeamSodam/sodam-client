import { wrapper } from 'app/store';
import Footer from 'components/common/Footer';
import Layout from 'components/common/Layout';
import NavBar from 'components/common/Navbar/GlobalNav';
import useWindowSize from 'hooks/useWindowSize';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/globalStyle';
import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const { clientWidth, availableWidth } = useWindowSize();

  return (
    <ThemeProvider theme={{ ...theme, clientWidth, availableWidth }}>
      <GlobalStyles />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HBLD5HLLL6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HBLD5HLLL6');`}
      </Script>
      <Head>
        <title>소담 :: 소품샵 여정의 이야기를 담다</title>
      </Head>
      <Layout>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
