import { wrapper } from 'app/store';
import Footer from 'components/common/Footer';
import Layout from 'components/common/Layout';
import NavBar from 'components/common/Navbar/GlobalNav';
import useWindowSize from 'hooks/useWindowSize';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/globalStyle';
import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const { clientWidth } = useWindowSize();
  return (
    <ThemeProvider theme={{ ...theme, clientWidth }}>
      <GlobalStyles />
      <Head>
        <title>소담</title>
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
