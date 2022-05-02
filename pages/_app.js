import { createTheme, ThemeProvider } from '@mui/material';
import {SessionProvider} from 'next-auth/react';
import '../styles/globals.css'
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
    ].join(','),
  },});
export default function App({ Component, pageProps }) {
    return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    )
  }
