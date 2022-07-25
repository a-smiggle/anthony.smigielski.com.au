import { PillBadge } from '@nextail/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import GetArticle from '../../lib/GetArticle';
import MarkdownToHtml from '../../lib/MarkdownToHtml';
import { Article } from '../../lib/Supabase';
import markdownStyles from '../../styles/markdown.module.css';

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
  const router = useRouter();
  useEffect(() => {
    if (!article && !content) router.push('/404');
  }, []);
  if (article && content) {
    const tags = article.tags.split(',');
    const subTags = article.subTags.split(',');

    return (
      <Layout>
        <main className="relative flex max-h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overflow-x-hidden px-8 md:top-[4rem] md:snap-y">
          <section className={`flex flex-col pb-8`}>
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
              <div className="w-1/6"></div>
              <div
                className={markdownStyles.markdown}
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="flex h-fit w-1/6 flex-row flex-wrap gap-2 pt-4 pl-4">
                {tags.map((tag, index) => (
                  <PillBadge
                    mainStylings={{
                      background: { backgroundColor: 'bg-emerald-500' },
                    }}
                    key={index}
                  >
                    {tag}
                  </PillBadge>
                ))}
                {subTags.map((tag, index) => (
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
          </section>
          <Footer />
        </main>
      </Layout>
    );
  }
  return null;
}

export default BlogPostPage;
