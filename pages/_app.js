import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';
import { Provider } from 'next-auth/client';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@emotion/react';

import createEmotionCache from '@/utils/createEmotionCache';
import { useApollo } from '@/utils/apollo/client';
import Layout from 'components/Layout';
import theme from 'styles/Theme';
import 'styles/globals.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <Provider session={pageProps.session}>
          <CacheProvider value={emotionCache}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </StyledEngineProvider>
          </CacheProvider>
        </Provider>
      </RecoilRoot>
    </ApolloProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
