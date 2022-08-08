import '../styles/globals.css';
import '@nextail/core/nextail.css';

import { LayoutProvider, ThemeProvider } from '@nextail/providers';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Meta from '../components/Meta';
import { UserContextProvider } from '../lib/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let current = router.pathname;
    if (current === '/blog/[id]') current = `/blog/${router.query.id}`;
    const prevPath = window.sessionStorage.getItem('currentPath');
    window.sessionStorage.setItem('prevPath', prevPath ?? '/');
    window.sessionStorage.setItem('currentPath', current);
  }, [router.asPath]);

  return (
    <UserContextProvider>
      <LayoutProvider>
        <ThemeProvider>
          <Meta />
          <Component {...pageProps} />
        </ThemeProvider>
      </LayoutProvider>
    </UserContextProvider>
  );
}

export default MyApp;
