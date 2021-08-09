import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from '@material-ui/styles';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Layout from 'components/Layout';
import theme from 'styles/Theme';
import 'styles/globals.css';

const graphqlUri = `/api/graphql`;

// Configure the ApolloClient to connect to your app's GraphQL endpoint
const client = new ApolloClient({
  uri: graphqlUri,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Provider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Provider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default appWithTranslation(MyApp);
