import { Button, PillBadge } from '@nextail/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useSWR, { useSWRConfig } from 'swr';

import CommentSection from '../../components/Comments';
import Layout from '../../components/Layout';
import GetArticle from '../../lib/GetArticle';
import MarkdownToHtml from '../../lib/MarkdownToHtml';
import Supabase from '../../lib/Supabase';
import { useUser } from '../../lib/UserContext';
import markdownStyles from '../../styles/markdown.module.css';
import { Article } from '../../types/Article';
import { ArticleVotes } from '../../types/ArticleVotes';

const GET_ARTICLE_VOTES = (id: string) => {
  const { data } = useSWR(`Article Votes: ${id.toString()}`, async () =>
    Supabase.from('article_votes').select('*').eq('articleId', id)
  );
  if (data && data.data) return data.data;
  return undefined;
};

export async function getServerSideProps(context: any) {
  const data = await GetArticle(context.params.id);
  if (data && data[0] && data[0].link) {
    const parsed = await fetch(data[0].link);
    const content = await MarkdownToHtml(await parsed.text());
    return {
      props: {
        article: data[0],
        content,
      },
    };
  }

  return {
    props: {
      article: null,
      content: null,
    },
  };
}

function BlogPostPage({
  article,
  content,
}: {
  article: Article;
  content: string;
}) {
  const { mutate } = useSWRConfig();
  const { user } = useUser();

  const router = useRouter();
  const { id } = router.query;
  let articleVotes: ArticleVotes[] | undefined;
  if (id && typeof id === 'string') articleVotes = GET_ARTICLE_VOTES(id);

  const handleVote = async (value: number) => {
    const { data } = await Supabase.from('article_votes').upsert(
      [{ articleId: id, userId: user?.id, value }],
      {
        onConflict: 'articleId, userId',
      }
    );
    if (data) mutate(`Article Votes: ${id?.toString()}`);
  };

  useEffect(() => {
    if (!article && !content) router.push('/404');
  }, []);

  if (article && content) {
    const tags = article.tags?.split(',');
    const subTags = article.subTags?.split(',');

    return (
      <Layout>
        <section className={`flex h-full flex-col pb-8`}>
          <h1 className="pb-4 text-center">{article.title}</h1>
          <div className="mx-auto flex justify-center md:w-3/4">
            <div>
              <Image
                src={article.image}
                alt=""
                layout="intrinsic"
                width={article.imageWidth}
                height={article.imageHeight}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center md:flex-row">
            <div className="fixed bottom-4 right-4 z-50 md:relative md:w-1/6">
              <div className="flex items-center gap-2">
                {user &&
                articleVotes
                  ?.filter((vote) => vote.value > 0)
                  .find((vote) => vote.userId === user?.id) ? (
                  <Button
                    mainStylings={{ className: ' ' }}
                    disabled={!user}
                    onClick={() => handleVote(0)}
                  >
                    <AiFillHeart className="h-12 w-12 fill-red-500 hover:fill-slate-300" />
                  </Button>
                ) : (
                  <Button
                    mainStylings={{ className: ' ' }}
                    disabled={!user}
                    onClick={() => handleVote(1)}
                  >
                    <AiOutlineHeart className="h-12 w-12 hover:text-red-500" />
                  </Button>
                )}
                {articleVotes?.filter((vote) => vote.value > 0).length}
              </div>
            </div>
            <div
              className={markdownStyles.markdown}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="flex flex-col justify-between md:w-1/6">
              <div className="flex flex-row flex-wrap gap-2 pt-4 pl-4">
                {tags?.map((tag, index) => (
                  <PillBadge
                    mainStylings={{
                      background: { backgroundColor: 'bg-emerald-500' },
                    }}
                    key={index}
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
                      text: { textColor: 'text-emerald-500' },
                    }}
                    key={index}
                  >
                    {tag}
                  </PillBadge>
                ))}
              </div>
            </div>
          </div>
        </section>
        <CommentSection id={article.id} />
      </Layout>
    );
  }
  return null;
}

export default BlogPostPage;
