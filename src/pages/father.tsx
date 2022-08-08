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

function Father({ articles }: { articles: Article[] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <Layout title="The Father" articles={articles}>
      <section
        className={`flex flex-col items-center justify-between p-4 md:my-auto md:flex-row ${
          loaded ? 'fade-in-lr' : ''
        }`}
      >
        <div className="hidden md:flex">
          <Image
            fade-in-lr="3"
            alt="Father Image"
            src="/images/father/Image2.svg"
            width={500}
            height={500}
          />
        </div>
        <div className="text-right md:w-4/5 lg:w-3/4">
          <div className="float-left md:hidden">
            <Image
              fade-in-lr="3"
              alt="Father Image"
              src="/images/father/Image2.svg"
              width={250}
              height={250}
            />
          </div>
          <h1 fade-in-lr="1">The Father</h1>

          <p fade-in-lr="2" className="pt-4">
            I am extremely grateful to be the father of an amazing daughter.
            Being a parent has so far gifted me with so much joy as well as
            challenges which have been opportunities to grow both as a person
            and as a parent.
          </p>
          <p fade-in-lr="3" className="pt-4">
            I believe that all children are born with innate intelligent and
            that they are capable of communicating what their needs are. What is
            needed is the patience, curiosity and desire to understand them.
            Infants, toddlers, children and teenagers should all be treated as
            our equals and shown the same basic respect that we expect
            ourselves. I strive to provide a peaceful and nurturing environment
            so that my daughter can flourish as she continues grow and learn.
          </p>
          <p fade-in-lr="4" className="pt-4">
            I will aim to provide regular blog posts on challenges I have had as
            a father and how we as a family work through these.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default Father;
