import { wrapper } from 'app/store';
import type { AppProps } from 'next/app';
import GlobalStyles from 'styles/globalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
