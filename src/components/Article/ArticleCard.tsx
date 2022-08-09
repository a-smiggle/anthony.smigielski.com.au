import { ImageLeftCard, PillBadge } from '@nextail/core';
import Link from 'next/link';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import useSWR from 'swr';

import Supabase from '../../lib/Supabase';
import { Article } from '../../types/Article';
import { ArticleVotes } from '../../types/ArticleVotes';

const GET_ARTICLE_VOTES = (id: number) => {
  const { data } = useSWR(`Article Votes: ${id.toString()}`, async () =>
    Supabase.from('article_votes').select('*').eq('articleId', id)
  );
  if (data && data.data) return data.data;
  return undefined;
};

function ArticleCard({ article }: { article: Article }) {
  const tags = article.tags?.split(',');
  const subTags = article.subTags?.split(',');
  const articleVotes: ArticleVotes[] | undefined = GET_ARTICLE_VOTES(
    article.id
  );

  return (
    <Link key={article.id} href={`/blog/${article.id}`}>
      <div className="relative cursor-pointer hover:scale-105">
        <div className="absolute top-2 right-2 flex items-center gap-2 rounded bg-white px-1 dark:bg-slate-800 md:bg-none">
          {articleVotes?.filter((vote) => vote.value > 0).length}
          <AiFillHeart className="fill-red-500 hover:scale-105" />
        </div>
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
            </div>
          }
        />
      </div>
    </Link>
  );
}

export default ArticleCard;
