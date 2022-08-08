import Image from 'next/image';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Supabase from '../lib/Supabase';
import { Article } from '../types/Article';

export async function getServerSideProps() {
  const { data } = await Supabase.from('articles').select('*').order('id');
  return {
    props: {
      articles: data,
    },
  };
}

function Gardener({ articles }: { articles: Article[] }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <Layout title="The Gardner" articles={articles}>
      <section
        className={`flex flex-col items-center justify-between p-4 md:my-auto md:flex-row ${
          loaded ? 'fade-in-lr' : ''
        }`}
      >
        <div className="lg:w-3/4">
          <h1 fade-in-lr="1">The Gardener</h1>
          <div className="float-right flex lg:hidden">
            <Image
              fade-in-lr="4"
              alt="Gardening Image"
              src="/images/gardener/Image1.svg"
              width={250}
              height={250}
            />
          </div>
          <p fade-in-lr="2" className="pt-4">
            The more we try and separate ourselves from nature, the more
            imbalanced we become with our surroundings and ourselves. I believe
            to improve our health and the health of the planet it is essential
            we all move towards a more peaceful, organic, plant focused
            lifestyle.
          </p>
          <p fade-in-lr="3" className="pt-4">
            We aim to grow as much of our food as possible. By growing a broad
            range of fruits and vegetables, all the essential nutrients we need
            will eventually be sourced from within our small suburban block.
            While we work towards this goal, we are still outsourcing fresh
            organic produce. We also purchase bulk, dried legumes and grains
            which helps extends the base of the vegetables we grow.
          </p>
          <p fade-in-lr="4" className="pt-4">
            I will aim to provide regular blog posts on the gardening methods we
            use, plants we are growing and recipes my amazing wife creates with
            the food grown.
          </p>
        </div>
        <div className="hidden lg:flex">
          <Image
            fade-in-lr="4"
            alt="Gardening Image"
            src="/images/gardener/Image1.svg"
            width={750}
            height={750}
          />
        </div>
      </section>
    </Layout>
  );
}

export default Gardener;
