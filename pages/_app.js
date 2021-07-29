import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';
import { Provider } from 'next-auth/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ThemeProvider } from '@material-ui/styles';

import Layout from '../components/Layout';
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
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </RecoilRoot>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'spaces'])),
  },
});

export default appWithTranslation(MyApp);
