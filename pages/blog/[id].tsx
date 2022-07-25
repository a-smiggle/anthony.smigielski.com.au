import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import GetArticle from '../../lib/GetArticle';
import MarkdownToHtml from '../../lib/MarkdownToHtml';
import { Article } from '../../lib/Supabase';
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
      data: null,
      content: null,
    },
  };
}

function BlogPostPage({ data, content }: { data: Article; content: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  if (!data || !content) router.push('/404');
  else setLoading(false);
  return (
    <Layout>
      <main className="relative flex max-h-[calc(100vh-4rem)] w-screen flex-col overflow-y-auto overflow-x-hidden px-8 md:top-[4rem] md:snap-y">
        {loading === true ? null : (
          <Fragment>
            <section className={`flex flex-col pb-8`}>
              <h1 className="pb-4 text-center">{data.title}</h1>
              <div className="mx-auto flex justify-center md:w-3/4">
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
          </Fragment>
        )}
      </main>
    </Layout>
  );
}

export default BlogPostPage;
