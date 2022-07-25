import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Title from '../components/Title';

function NotFound() {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.4,
    initialInView: true,
  });
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <Layout>
      <main className="relative flex max-h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overflow-x-hidden px-8 md:top-[4rem] md:snap-y">
        <Title inView={inView}>Anthony Smigielski</Title>
        <section
          ref={ref}
          className={`flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:min-h-[calc(100vh-7rem)] md:snap-center lg:flex-row ${
            loaded ? 'fade-in-lr' : ''
          }`}
        >
          <div className="pr-4 text-right">
            <h1 fade-in-lr="1" className="dark:text-slate-300">
              Sorry
            </h1>
            <h1
              fade-in-lr="2"
              className="bg-gradient-to-r  from-emerald-300 to-emerald-600 bg-clip-text py-4 text-5xl text-transparent dark:from-emerald-600 dark:to-emerald-300"
            >
              Page Not Found.
            </h1>
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
}

export default NotFound;
