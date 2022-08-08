import { PillBadge } from '@nextail/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import CommentSection from '../../components/Comments';
import Layout from '../../components/Layout';
import GetArticle from '../../lib/GetArticle';
import MarkdownToHtml from '../../lib/MarkdownToHtml';
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
        <CommentSection id={article.id} />
      </Layout>
    );
  }
  return null;
}

export default BlogPostPage;
