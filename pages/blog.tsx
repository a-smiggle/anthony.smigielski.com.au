import { Button } from '@nextail/core';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import Footer from '../components/Footer';
import Layout from '../components/Layout';

const Husband: NextPage = () => {
  const [selected, setSelected] = useState('all');
  const buttonStyling =
    'px-4 py-2 bg-black dark:bg-slate-300 text-white dark:text-black uppercase hover:bg-emerald-400 hover:dark:bg-emerald-400 active:translate-y-0.5 transition-all duration-100';
  const activeButtonStyling =
    'px-4 py-2 bg-emerald-500 dark:bg-emerald-500 dark:bg-slate-300 text-white dark:text-white uppercase font-bold';
  return (
    <Layout>
      <main className="relative flex max-h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overflow-x-hidden px-8 md:top-[4rem] md:snap-y">
        <div className="flex min-h-[calc(100vh-4rem)] flex-row justify-center">
          <div>
            <h1 className="pb-4 text-center">Articles</h1>
            <div className="hidden">
              <Button
                mainStylings={{
                  className: `rounded-l ${
                    selected === 'all' ? activeButtonStyling : buttonStyling
                  }`,
                }}
                onClick={() => setSelected('all')}
              >
                All
              </Button>
              <Button
                mainStylings={{
                  className:
                    selected === 'developer'
                      ? activeButtonStyling
                      : buttonStyling,
                }}
                onClick={() => setSelected('developer')}
              >
                Developer
              </Button>
              <Button
                mainStylings={{
                  className:
                    selected === 'father' ? activeButtonStyling : buttonStyling,
                }}
                onClick={() => setSelected('father')}
              >
                Father
              </Button>
              <Button
                mainStylings={{
                  className:
                    selected === 'husband'
                      ? activeButtonStyling
                      : buttonStyling,
                }}
                onClick={() => setSelected('husband')}
              >
                Husband
              </Button>
              <Button
                mainStylings={{
                  className: `rounded-r ${
                    selected === 'gardener'
                      ? activeButtonStyling
                      : buttonStyling
                  }`,
                }}
                onClick={() => setSelected('gardener')}
              >
                Gardener
              </Button>
            </div>
            <h2 className="pt-4 text-center">Coming Soon</h2>
            <Image
              alt="Under Construction"
              src="/images/under_construction.svg"
              width={500}
              height={500}
            />
          </div>
        </div>

        <Footer />
      </main>
    </Layout>
  );
};

export default Husband;
