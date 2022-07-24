import { ImageCard } from '@nextail/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { InView } from 'react-intersection-observer';

import { Articles } from '../lib/Supabase';

export default function Blog({ articles }: { articles: Articles[] }) {
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
          <div className="grid gap-2 pt-4 md:grid-cols-3 lg:grid-cols-5">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <div className="hover:scale-105">
                  <ImageCard
                    image={article.image}
                    title={article.title}
                    info={article.excerpt}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </InView>
  );
}
