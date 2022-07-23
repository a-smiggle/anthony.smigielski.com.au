import Image from 'next/image';
import React from 'react';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import GetArticle from '../../lib/GetArticle';
import MarkdownToHtml from '../../lib/MarkdownToHtml';
import { Articles } from '../../lib/Supabase';
import markdownStyles from '../../styles/markdown.module.css';

export async function getServerSideProps(context: any) {
  const data = await GetArticle(context.params.id);
  if (data && data[0]) {
    const parsed = await fetch(data[0].link);
    const content = await MarkdownToHtml(await parsed.text());
    return {
      props: {
        data: data[0],
        content,
      },
    };
  }
  return {
    props: {
      data: undefined,
      content: undefined,
    },
  };
}

function BlogPostPage({ data, content }: { data: Articles; content: string }) {
  return (
    <Layout>
      <main className="relative flex max-h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overflow-x-hidden px-8 md:top-[4rem] md:snap-y">
        <section className={`flex flex-col pb-8`}>
          <h1 className="pb-4 text-center">{data.title}</h1>
          <div className="mx-auto flex w-3/4 justify-center">
            <div>
              <Image
                src={data.image}
                alt=""
                layout="intrinsic"
                width={data.imageWidth}
                height={data.imageHeight}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className={markdownStyles.markdown}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
}

export default BlogPostPage;
