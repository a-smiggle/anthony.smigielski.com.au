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

function Father({ articles }: { articles: Articles[] }) {
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
        <Title inView={inView}>The Father</Title>
        <section
          ref={ref}
          className={`flex flex-col items-center justify-between md:min-h-[calc(100vh-4rem)] md:snap-center lg:flex-row ${
            loaded ? 'fade-in-lr' : ''
          }`}
        >
          <Image fade-in-lr="3"
            alt="Father Image"
            src="/images/father/Image2.svg"
            width={750}
            height={750}
          />
          <div className="text-right md:w-3/4">
            <h1 fade-in-lr="1">The Father</h1>

            <p fade-in-lr="2" className="pt-4">
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
            <h4 className="text-right">I hope you enjoy.</h4>
          </div>
        </section>
        <Blog
          articles={articles.filter((article) =>
            article.tags.includes('father')
          )}
        />
        <Footer />
      </main>
    </Layout>
  );
}

export default Father;
