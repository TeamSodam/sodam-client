import { wrapper } from 'app/store';
import Footer from 'components/common/Footer';
import NavBar from 'components/common/Navbar/GlobalNav';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/globalStyle';
import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
