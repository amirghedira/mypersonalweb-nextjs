import '../styles/globals.css'
import "../styles/css/bootstrap.min.css";
import "../styles/scss/now-ui-kit.css";
import React from 'react'
import AppContext from '../context/AppContext'
import IndexNavbar from '../components/IndexNavbar/IndexNavbar'
import IndexHeader from '../components/Headers/IndexHeader'
import DarkFooter from '../components/Footers/DarkFooter'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (

    <React.Fragment>

      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2c2c2c" />
      </Head>
      <AppContext>
        <IndexHeader />
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          showSpinner={false}
          options={{ showSpinner: false }}
          height="3"
        />
        <IndexNavbar />
        <Component {...pageProps} />
        <DarkFooter />
      </AppContext>
    </React.Fragment>
  )
}

export default MyApp
