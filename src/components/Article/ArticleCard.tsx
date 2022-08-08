import { ImageLeftCard, PillBadge } from '@nextail/core';
import Link from 'next/link';
import React from 'react';

import { Article } from '../../types/Article';

function ArticleCard({ article }: { article: Article }) {
  const tags = article.tags?.split(',');
  const subTags = article.subTags?.split(',');

  return (
    <Link key={article.id} href={`/blog/${article.id}`}>
      <div className="hover:scale-105">
        <ImageLeftCard
          image={article.image}
          title={article.title}
          info={article.excerpt}
          buttons={
            <div>
              <div className="flex flex-wrap">
                {tags?.map((tag, index) => (
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
              {subTags?.map((tag, index) => (
                <PillBadge
                  mainStylings={{
                    background: { backgroundColor: 'bg-none' },
                    border: {
                      borderWidth: 'border-2',
                      borderColor: 'border-emerald-500',
                    },
                    text: {
                      fontSize: 'text-xs',
                      textColor: 'text-emerald-500',
                    },
                  }}
                  key={index}
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
