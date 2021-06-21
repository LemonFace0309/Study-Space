import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from '@material-ui/styles';

import Layout from '../components/Layout/Layout';
import { SocketProvider } from '../context/SocketProvider';
import { ConversationProvider } from '../context/ConversationProvider';
import theme from '../styles/Theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <RecoilRoot>
      <Provider session={pageProps.session}>
        <SocketProvider>
          <ConversationProvider>
            <ThemeProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </ConversationProvider>
        </SocketProvider>
      </Provider>
    </RecoilRoot>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
