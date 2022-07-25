import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Blog from '../components/Blog';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Supabase, { Article } from '../lib/Supabase';

export async function getServerSideProps() {
  const { data } = await Supabase.from('articles').select('*').order('id');
  return {
    props: {
      articles: data,
    },
  };
}

function Home({ articles }: { articles: Article[] }) {
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
          className={`flex flex-col items-center justify-between md:min-h-[calc(100vh-4rem)] md:snap-center lg:flex-row ${
            loaded ? 'fade-in-lr' : ''
          }`}
        >
          <div className="hidden min-h-[calc(100vh-4rem)] justify-between lg:flex lg:flex-col">
            <div fade-in-lr="8" className="p-4">
              <Image
                className="transition-all duration-300 dark:invert"
                alt="https://www.flaticon.com/free-icons/dad"
                src={'/images/father-and-daughter.png'}
                width={250}
                height={250}
              />
            </div>
            <div fade-in-lr="9">
              <Image
                className="transition-all duration-700 dark:invert"
                alt="https://www.flaticon.com/free-icons/garden"
                src={'/images/farming.png'}
                width={250}
                height={250}
              />
            </div>
          </div>
          <div className="pr-4 text-right lg:w-1/2">
            <h1 fade-in-lr="1" className="dark:text-slate-300">
              Hello
            </h1>
            <h1
              fade-in-lr="2"
              className="bg-gradient-to-r  from-emerald-300 to-emerald-600 bg-clip-text py-4 text-5xl text-transparent dark:from-emerald-600 dark:to-emerald-300"
            >
              I&apos;m Anthony.
            </h1>
            <p fade-in-lr="3" className="pt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris
              nunc congue nisi vitae suscipit tellus mauris a. A diam
              sollicitudin tempor id. Ut porttitor leo a diam sollicitudin
              tempor id. Phasellus egestas tellus rutrum tellus pellentesque.
              Massa tempor nec feugiat nisl pretium fusce id velit ut. Blandit
              volutpat maecenas volutpat blandit aliquam. Nam libero justo
              laoreet sit. Arcu dui vivamus arcu felis bibendum ut tristique et
              egestas. Eu consequat ac felis donec et odio pellentesque diam
              volutpat. Pellentesque adipiscing commodo elit at imperdiet. Nibh
              praesent tristique magna sit amet purus gravida quis. Lacus sed
              viverra tellus in hac. Sed euismod nisi porta lorem mollis aliquam
              ut. Sed augue lacus viverra vitae congue eu consequat. Dolor sit
              amet consectetur adipiscing elit pellentesque. Et odio
              pellentesque diam volutpat commodo sed egestas. Semper viverra nam
              libero justo laoreet sit amet cursus. Volutpat sed cras ornare
              arcu dui. Quisque id diam vel quam elementum pulvinar etiam non
              quam.
            </p>
          </div>
          <div className="hidden min-h-[calc(100vh-4rem)] justify-center lg:flex lg:flex-col">
            <div fade-in-lr="7">
              <Image
                className="transition-all duration-500 dark:invert"
                alt="https://www.flaticon.com/free-icons/data"
                src={'/images/data.png'}
                width={150}
                height={150}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-4 lg:hidden">
            <div fade-in-lr="7">
              <Image
                className="transition-all duration-300 dark:invert"
                alt="https://www.flaticon.com/free-icons/dad"
                src={'/images/father-and-daughter.png'}
                width={250}
                height={250}
              />
            </div>
            <div fade-in-lr="8">
              <Image
                className="transition-all duration-500 dark:invert"
                alt="https://www.flaticon.com/free-icons/data"
                src={'/images/data.png'}
                width={250}
                height={250}
              />
            </div>
            <div fade-in-lr="9">
              <Image
                className="transition-all duration-700 dark:invert"
                alt="https://www.flaticon.com/free-icons/garden"
                src={'/images/farming.png'}
                width={250}
                height={250}
              />
            </div>
          </div>
        </section>
        <Blog
          articles={articles
            .filter((article) => article.pin === true)
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )}
        />
        <Footer />
      </main>
    </Layout>
  );
}

export default Home;
