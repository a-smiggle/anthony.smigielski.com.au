import Image from 'next/image';
import React from 'react';
import { InView } from 'react-intersection-observer';

import { Article } from '../lib/Supabase';
import ArticleCard from './ArticleCard';

export default function Blog({ articles }: { articles: Article[] }) {
  if (articles.length === 0)
    return (
      <InView triggerOnce threshold={0.75}>
        {({ inView, ref }) => (
          <section
            ref={ref}
            className={`flex flex-col pt-4 md:min-h-[calc(100vh-4rem)] md:snap-start ${
              inView ? 'fade-in-tb' : ''
            }`}
          >
            <h1 fade-in-tb="1">Latest Articles</h1>
            <Image
              alt="Under Construction"
              src="/images/under_construction.svg"
              width={500}
              height={500}
            />
          </section>
        )}
      </InView>
    );
  return (
    <InView triggerOnce threshold={0.75}>
      {({ inView, ref }) => (
        <section
          ref={ref}
          className={`flex flex-col pt-4 md:min-h-[calc(100vh-4rem)] md:snap-start ${
            inView ? 'fade-in-tb' : ''
          }`}
        >
          <h1 fade-in-tb="1">Latest Articles</h1>
          <div className="grid gap-2 pt-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </InView>
  );
}
