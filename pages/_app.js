import { Provider } from 'next-auth/client'

import Layout from '../components/Layout/Layout'
import { SocketProvider } from '../context/SocketContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <SocketProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SocketProvider>
    </Provider>
  )
}

export default MyApp
