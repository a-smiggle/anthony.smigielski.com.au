import { useThemeContext } from '@nextail/providers';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';

function NotFound() {
  const { theme } = useThemeContext();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <Layout title="Anthony Smigielski">
      <section
        className={`flex h-[calc(100vh-8rem)] flex-col items-center justify-center bg-cover lg:flex-row ${
          loaded ? 'fade-in-lr' : ''
        }`}
        style={{
          backgroundImage:
            theme === 'light'
              ? 'url(/images/bg-light.png)'
              : 'url(/images/bg-dark.png)',
        }}
      >
        <div className="pr-4 text-right">
          <h1 fade-in-lr="1" className="dark:text-slate-300">
            Sorry
          </h1>
          <h1
            fade-in-lr="2"
            className="bg-gradient-to-r  from-emerald-100 to-white bg-clip-text py-4 text-5xl text-transparent dark:from-white dark:to-emerald-100"
          >
            Page Not Found.
          </h1>
        </div>
      </section>
    </Layout>
  );
}

export default NotFound;
