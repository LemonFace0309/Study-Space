import { useEffect } from 'react'
import { Provider } from 'next-auth/client'

import Layout from '../components/Layout/Layout'
import { SocketProvider } from '../context/SocketProvider'
import { ConversationProvider } from '../context/ConversationProvider'
import '../styles/globals.css'

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
      <SocketProvider>
        <ConversationProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ConversationProvider>
      </SocketProvider>
    </Provider>
  )
}

export default MyApp
