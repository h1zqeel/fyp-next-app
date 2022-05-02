import { createTheme, ThemeProvider } from '@mui/material';
import {SessionProvider} from 'next-auth/react';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import '../styles/globals.css'
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
    ].join(','),
  },});
  Router.events.on('routeChangeStart', () => NProgress.start()); 
  Router.events.on('routeChangeComplete', () => NProgress.done()); 
  Router.events.on('routeChangeError', () => NProgress.done());
  
export default function App({ Component, pageProps }) {
    return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    )
  }
