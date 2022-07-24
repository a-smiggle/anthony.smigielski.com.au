import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Blog from '../components/Blog';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Supabase, { Articles } from '../lib/Supabase';

export async function getStaticProps() {
  const { data } = await Supabase.from('articles').select('*').order('id');
  return {
    props: {
      articles: data,
    },
  };
}

function Husband({ articles }: { articles: Articles[] }) {
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
        <Title inView={inView}>The Husband</Title>
        <section
          ref={ref}
          className={`flex h-full flex-col justify-between md:snap-center lg:min-h-[calc(100vh-4rem)] lg:flex-row`}
        >
          <div
            className={`flex h-fit flex-col justify-center pr-4 lg:min-h-[calc(100vh-4rem)] ${
              loaded ? 'fade-in-lr' : ''
            }`}
          >
            <Image
              fade-in-lr="4"
              alt="Wedding Image"
              src="/images/husband/Image1.svg"
              width={250}
              height={250}
            />
          </div>

          <div className="flex h-fit flex-col justify-center lg:min-h-[calc(100vh-4rem)] lg:w-1/2">
            <div className={`text-left ${loaded ? 'fade-in-lr' : ''}`}>
              <h1 fade-in-lr="1">The Husband</h1>
            </div>

            <div className={`pt-4 text-left ${loaded ? 'fade-in-rl' : ''}`}>
              <p fade-in-rl="2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Mauris nunc congue nisi vitae suscipit tellus mauris a. A diam
                sollicitudin tempor id. Ut porttitor leo a diam sollicitudin
                tempor id. Phasellus egestas tellus rutrum tellus pellentesque.
                Massa tempor nec feugiat nisl pretium fusce id velit ut. Blandit
                volutpat maecenas volutpat blandit aliquam. Nam libero justo
                laoreet sit. Arcu dui vivamus arcu felis bibendum ut tristique
                et egestas. Eu consequat ac felis donec et odio pellentesque
                diam volutpat. Pellentesque adipiscing commodo elit at
                imperdiet. Nibh praesent tristique magna sit amet purus gravida
                quis. Lacus sed viverra tellus in hac. Sed euismod nisi porta
                lorem mollis aliquam ut. Sed augue lacus viverra vitae congue eu
                consequat. Dolor sit amet consectetur adipiscing elit
                pellentesque. Et odio pellentesque diam volutpat commodo sed
                egestas. Semper viverra nam libero justo laoreet sit amet
                cursus. Volutpat sed cras ornare arcu dui. Quisque id diam vel
                quam elementum pulvinar etiam non quam.
              </p>
            </div>
          </div>
          <div
            className={`flex h-full flex-row justify-between lg:min-h-[calc(100vh-4rem)] lg:flex-col ${
              loaded ? 'fade-in-rl' : ''
            }`}
          >
            <Image
              fade-in-rl="5"
              alt="Thinking Image"
              src="/images/husband/Image2.svg"
              width={250}
              height={250}
            />
            <Image
              fade-in-rl="6"
              alt="Discussion Image"
              src="/images/husband/Image3.svg"
              width={250}
              height={250}
            />
          </div>
        </section>
        <Blog
          articles={articles.filter((article) =>
            article.tags.includes('husband')
          )}
        />
        <Footer />
      </main>
    </Layout>
  );
}

export default Husband;
