import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import React from 'react'
import {Hydrate,QueryClient,QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient=React.useRef(new QueryClient());
  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedState}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Hydrate>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  )
}

export default MyApp
