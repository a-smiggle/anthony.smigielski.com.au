import { Fragment, useEffect, useState } from 'react';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import {
  SiFirebase,
  SiInfluxdb,
  SiJavascript,
  SiLua,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSqlite,
  SiStrapi,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { TbLetterC } from 'react-icons/tb';

import { SectionThree, SectionTwo } from '../components/Developer';
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

function Developer({ articles }: { articles: Article[] }) {
  const [loaded, setLoaded] = useState(false);
  const [wiggle, setWiggle] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setWiggle(Math.floor(Math.random() * 16));
    }, 5000);
    return () => clearInterval(timer);
  });

  return (
    <Layout
      title="The Developer"
      articles={articles}
      header={
        <Fragment>
          <div
            className={`order-2 md:order-none md:row-span-2 ${
              loaded ? 'fade-in-lr' : ''
            }`}
          >
            <div
              fade-in-lr="1"
              className="flex h-64 w-full flex-col items-center justify-center md:h-full"
            >
              <h2 className="text-center">Languages</h2>
              <div className="grid w-full grid-cols-2 place-items-center gap-4 pt-4 md:grid-cols-3">
                <SiTypescript
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 0 ? 'animate-wiggle text-[#3178C6]' : ''
                  }`}
                />
                <SiJavascript
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 1 ? 'animate-wiggle text-[#F0DB4F]' : ''
                  }`}
                />
                <TbLetterC
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 2 ? 'animate-wiggle text-black' : ''
                  }`}
                />
                <SiPython
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 3 ? 'animate-wiggle text-[#4B8BBE]' : ''
                  }`}
                />
                <SiLua
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 4 ? 'animate-wiggle text-[#000080]' : ''
                  }`}
                />
              </div>
            </div>
          </div>
          <div
            className={`order-first flex flex-col items-center justify-between md:order-none md:row-span-4 ${
              loaded ? 'fade-in-bt' : ''
            }`}
          >
            <div></div>
            <div className="text-center lg:text-left">
              <h1
                fade-in-bt="5"
                className="dark:text-slate-300 md:text-6xl lg:text-7xl xl:text-8xl"
              >
                The
              </h1>
              <h1
                fade-in-bt="6"
                className="dark:text-slate-300 md:text-6xl lg:text-7xl xl:text-8xl"
              >
                Developer
              </h1>
            </div>
            <div className="hidden md:flex">
              <BsArrowDownCircleFill className="h-12 w-12 animate-bounce" />
            </div>
          </div>
          <div
            className={`order-3 md:order-none md:row-span-2 ${
              loaded ? 'fade-in-rl' : ''
            }`}
          >
            <div
              fade-in-rl="2"
              className="flex h-64 w-full flex-col items-center justify-center md:h-full"
            >
              <h2 className="text-center">Frameworks</h2>
              <div className="grid w-full grid-cols-2 place-items-center items-center gap-4 pt-4 md:grid-cols-3">
                <SiReact
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 5 ? 'animate-wiggle text-[#61DBFB]' : ''
                  }`}
                />
                <SiNextdotjs
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 6 ? 'animate-wiggle text-black' : ''
                  }`}
                />
                <SiTailwindcss
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 7 ? 'animate-wiggle text-[#38bdf8]' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          <div
            className={`order-9 md:order-none md:row-span-2 ${
              loaded ? 'fade-in-lr' : ''
            }`}
          >
            <div
              fade-in-lr="3"
              className="flex h-64 w-full flex-col items-center justify-center md:h-full md:pt-4"
            >
              <h2 className="text-center">CMS</h2>
              <div className="grid w-full grid-cols-2 place-items-center items-center gap-4 pt-4 md:grid-cols-3">
                <SiStrapi
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 8 ? 'animate-wiggle text-[#8c4bff]' : ''
                  }`}
                />
                <SiSupabase
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 9 ? 'animate-wiggle text-[#34b27b]' : ''
                  }`}
                />
                <SiFirebase
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 10 ? 'animate-wiggle text-[#FFCA28]' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          <div
            className={`order-7 md:order-none md:row-span-2 ${
              loaded ? 'fade-in-rl' : ''
            }`}
          >
            <div
              fade-in-rl="4"
              className="flex h-64 w-full flex-col items-center justify-center md:h-full"
            >
              <h2 className="text-center">Databases</h2>
              <div className="grid w-full grid-cols-2 place-items-center items-center gap-4 pt-4 md:grid-cols-3">
                <SiInfluxdb
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 11 ? 'animate-wiggle text-[#020a47]' : ''
                  }`}
                />
                <SiMongodb
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 12 ? 'animate-wiggle text-[#4DB33D]' : ''
                  }`}
                />
                <SiPostgresql
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 13 ? 'animate-wiggle text-[#008bb9]' : ''
                  }`}
                />
                <SiSqlite
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 14 ? 'animate-wiggle text-[#003B57]' : ''
                  }`}
                />
                <SiMysql
                  className={`h-12 w-12 transition-colors duration-500 ${
                    wiggle === 15 ? 'animate-wiggle text-[#00758F]' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </Fragment>
      }
      headerStylings={`grid md:grid-cols-3 md:grid-rows-4 p-4 md:gap-0 md:h-screen`}
    >
      <SectionTwo />
      <SectionThree />
    </Layout>
  );
}

export default Developer;
