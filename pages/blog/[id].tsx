import { Button, PillBadge } from '@nextail/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';

import Layout from '../../components/Layout';
import GetArticle from '../../lib/GetArticle';
import MarkdownToHtml from '../../lib/MarkdownToHtml';
import Supabase from '../../lib/Supabase';
import { useUser } from '../../lib/UserContext';
import markdownStyles from '../../styles/markdown.module.css';
import { Article } from '../../types/Article';

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
  const { user } = useUser();
  const router = useRouter();

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
            <div className="lg:w-1/6"></div>
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
        <section className="flex h-full flex-col px-4 pb-8 pt-4">
          <div className="flex flex-col justify-center md:flex-row">
            <div className="w-0 lg:w-1/6"></div>
            <div className="w-3/4 px-4">
              <h1>Comments</h1>
            </div>
            <div className="flex flex-col justify-between text-center md:w-1/6">
              {user ? null : <p>To leave comments</p>}
              {user ? (
                <Button
                  mainStylings={{
                    className:
                      'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
                  }}
                  onClick={async () => Supabase.auth.signOut()}
                >
                  <AiFillUnlock /> Sign Out
                </Button>
              ) : (
                <Button
                  mainStylings={{
                    className:
                      'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
                  }}
                  link="/login"
                >
                  <AiFillLock /> Sign In
                </Button>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
  return null;
}

export default BlogPostPage;
