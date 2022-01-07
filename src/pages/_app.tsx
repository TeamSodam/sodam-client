import { wrapper } from 'app/store';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/globalStyle';
import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
