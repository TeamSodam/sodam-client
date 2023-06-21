/* eslint-disable @next/next/no-sync-scripts */
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services`}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <meta name="description" content="소담의 소품샵 큐레이션을 만나보세요" />
          <meta property="og:title" content="소담 :: 소품샵 여정의 이야기를 담다" />
          <meta property="og:description" content="소담의 소품샵 큐레이션을 만나보세요" />
          <meta property="og:url" content="sodam.me" />
          <meta property="og:image" content="/assets/sodam_thumbnail.png" />
          <meta property="og:image:width" content="820" />
          <meta property="og:image:height" content="400" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}
