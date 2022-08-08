import { Button } from '@nextail/core';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

import { ArticleCard } from '../../components/Article';
import Layout from '../../components/Layout';
import Supabase from '../../lib/Supabase';
import { Article } from '../../types/Article';

export async function getServerSideProps() {
  const { data } = await Supabase.from('articles').select('*').order('id');
  return {
    props: {
      articles: data,
    },
  };
}
function BlogPage({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState('all');
  const [displayed, setDisplay] = useState(articles);

  useEffect(() => {
    if (selected !== 'all')
      setDisplay(
        articles.filter((article) => article.tags?.includes(selected))
      );
    else setDisplay(articles);
  }, [selected]);

  const buttonStyling =
    'px-4 py-2 bg-black dark:bg-slate-300 text-white dark:text-black uppercase hover:bg-emerald-400 hover:dark:bg-emerald-400 active:translate-y-0.5 transition-all duration-100';
  const activeButtonStyling =
    'px-4 py-2 bg-emerald-500 dark:bg-emerald-500 dark:bg-slate-300 text-white dark:text-white uppercase font-bold';

  return (
    <Layout articles={articles}>
      <div className="flex min-h-screen flex-row justify-center p-4">
        <div>
          <h1 className="pb-4 text-center">Articles</h1>
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:justify-center md:gap-0">
            <Button
              mainStylings={{
                className: `md:rounded-l ${
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
                  selected === 'husband' ? activeButtonStyling : buttonStyling,
              }}
              onClick={() => setSelected('husband')}
            >
              Husband
            </Button>
            <Button
              mainStylings={{
                className: `md:rounded-r ${
                  selected === 'gardener' ? activeButtonStyling : buttonStyling
                }`,
              }}
              onClick={() => setSelected('gardener')}
            >
              Gardener
            </Button>
          </div>
          {displayed && displayed.length === 0 ? (
            <Fragment>
              <h2 className="pt-4 text-center">Coming Soon</h2>
              <Image
                alt="Under Construction"
                src="/images/under_construction.svg"
                width={500}
                height={500}
              />
            </Fragment>
          ) : (
            <div className="grid gap-2 pt-4 md:grid-cols-2 lg:grid-cols-3">
              {displayed.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default BlogPage;
