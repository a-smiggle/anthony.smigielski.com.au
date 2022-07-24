import { ImageCard, PillBadge } from '@nextail/core';
import Link from 'next/link';
import React from 'react';

import { Article } from '../lib/Supabase';

function ArticleCard({ article }: { article: Article }) {
  const tags = article.tags.split(',');

  return (
    <Link key={article.id} href={`/blog/${article.id}`}>
      <div className="hover:scale-105">
        <ImageCard
          image={article.image}
          title={article.title}
          info={article.excerpt}
          buttons={
            <div className="flex flex-wrap">
              {tags.map((tag, index) => (
                <PillBadge
                  mainStylings={{
                    text: { fontSize: 'text-xs' },
                    background: { backgroundColor: 'bg-emerald-500' },
                  }}
                  key={`tag - ${index}`}
                >
                  {tag}
                </PillBadge>
              ))}
            </div>
          }
        />
      </div>
    </Link>
  );
}

export default ArticleCard;
