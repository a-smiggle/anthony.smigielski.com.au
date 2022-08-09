import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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

export default function Index({ articles }: { articles: Article[] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <Layout title="Anthony Smigielski" articles={articles}>
      <section
        className={`flex h-[calc(100vh-4rem)] flex-col items-center justify-between p-4 md:flex-row ${
          loaded ? 'fade-in-lr' : ''
        }`}
      >
        <div className="flex flex-row justify-between gap-4 md:hidden"></div>
        <div className="hidden h-full justify-between md:flex md:flex-col">
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
        <div className="pr-4 text-right md:w-3/4 lg:w-1/2">
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
            I am a full stack{' '}
            <Link href="/developer">
              <a className="text-2xl underline hover:text-emerald-500">
                developer
              </a>
            </Link>{' '}
            that favors Next.js, Tailwind CSS and Node.js as my favorite tools.
          </p>
          <p fade-in-lr="4" className="pt-4">
            I am also a devoted{' '}
            <Link href="/father">
              <a className="text-2xl underline hover:text-emerald-500">
                father
              </a>
            </Link>
            ,{' '}
            <Link href="/husband">
              <a className="text-2xl underline hover:text-emerald-500">
                husband
              </a>
            </Link>{' '}
            and an avid{' '}
            <Link href="/gardner">
              <a className="text-2xl underline hover:text-emerald-500">
                gardner
              </a>
            </Link>
            .
          </p>
        </div>
        <div className="hidden justify-center md:flex md:flex-col">
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
        <div className="flex flex-row justify-between gap-4 md:hidden">
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
    </Layout>
  );
}
