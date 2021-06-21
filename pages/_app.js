import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../styles/Theme';

import Layout from '../components/Layout/Layout';
import { SocketProvider } from '../context/SocketProvider';
import { ConversationProvider } from '../context/ConversationProvider';
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
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
