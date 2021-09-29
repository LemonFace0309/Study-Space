import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@/utils/createEmotionCache';

import theme from '@/styles/Theme';
import { ServerStyleSheets } from '@mui/styles';
class MyDocument extends Document {
  render() {
    return (
      // lang is auto generated
      <Html>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700&display=swap" />
          {/* Add hreflang for production: https://developers.google.com/search/docs/advanced/crawling/localized-versions?visit_id=637630569879337395-1542173951&rd=1 */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };

  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // const originalRenderPage = ctx.renderPage;

  // // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // // However, be aware that it can have global side effects.
  // const cache = createEmotionCache();
  // const { extractCriticalToChunks } = createEmotionServer(cache);

  // ctx.renderPage = () =>
  //   originalRenderPage({
  //     // eslint-disable-next-line react/display-name
  //     enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
  //   });

  // const initialProps = await Document.getInitialProps(ctx);
  // // This is important. It prevents emotion to render invalid HTML.
  // // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  // const emotionStyles = extractCriticalToChunks(initialProps.html);
  // const emotionStyleTags = emotionStyles.styles.map((style) => (
  //   <style
  //     data-emotion={`${style.key} ${style.ids.join(' ')}`}
  //     key={style.key}
  //     // eslint-disable-next-line react/no-danger
  //     dangerouslySetInnerHTML={{ __html: style.css }}
  //   />
  // ));

  // return {
  //   ...initialProps,
  //   // Styles fragment is rendered after the app and page rendering finish.
  //   styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  // };
};

export default MyDocument;
