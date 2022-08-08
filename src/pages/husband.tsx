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

function Husband({ articles }: { articles: Article[] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <Layout title="The Husband" articles={articles}>
      <section
        className={`flex flex-col justify-between px-4 md:my-auto md:flex-row`}
      >
        <div
          className={`flex flex-col justify-center pr-4 ${
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

        <div className={` md:w-3/4 ${loaded ? 'fade-in-rl' : ''}`}>
          <div className="float-right hidden md:flex">
            <Image
              fade-in-rl="5"
              alt="Thinking Image"
              src="/images/husband/Image2.svg"
              width={250}
              height={250}
            />
          </div>
          <h1 fade-in-rl="1">The Husband</h1>

          <p className="pt-4" fade-in-rl="2">
            I married my amazing wife in 2019 and have been continually growing
            as a person since then.
          </p>

          <p className="pt-4" fade-in-rl="3">
            A key component to our relationship remaining strong is honest
            communication. I am learning that staying quiet in frustration and
            not communicating with my wife only leads to further arguments as
            issues are never truly resolved. Clearly communicating our
            frustrations, wants and needs are key for the two of us to
            understand each other.
          </p>

          <p className="pt-4" fade-in-rl="4">
            My marriage is a partnership, and it shouldn&apos;t be taken for
            granted. I will continue to work on myself so that I may become a
            better husband. I am also aware that the relationship between my
            wife and I is demonstrating to my daughter how relationships can be.
          </p>
          <p className="pt-4" fade-in-rl="5">
            I will aim to provide regular blog posts on challenges I have as a
            husband and the resources that I have found to be essential in
            helping my relationship to thrive.
          </p>
          <div className="float-right hidden md:flex">
            <Image
              fade-in-rl="6"
              alt="Discussion Image"
              src="/images/husband/Image3.svg"
              width={250}
              height={250}
              className="float-right"
            />
          </div>
        </div>
        <div
          className={`flex flex-row justify-between md:hidden ${
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
    </Layout>
  );
}

export default Husband;
