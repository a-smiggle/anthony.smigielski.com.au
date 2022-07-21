import '../styles/globals.css';
import '@nextail/core/nextail.css';

import { LayoutProvider, ThemeProvider } from '@nextail/providers';
import type { AppProps } from 'next/app';

import Meta from '../components/Meta';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <ThemeProvider>
        <Meta />
        <Component {...pageProps} />
      </ThemeProvider>
    </LayoutProvider>
  );
}

export default MyApp;
