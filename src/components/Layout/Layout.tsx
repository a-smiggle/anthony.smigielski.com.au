import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';

import { Article } from '../../types/Article';
import { ArticlesSection } from '../Article';
import Footer from './Footer';
import Navbar from './Navbar';
import * as Theme from './Theme';
import Title from './Title';

interface CustomProps {
  header?: JSX.Element;
  headerStylings?: string;
  title?: string;
  articles?: Article[];
}

export default function Layout(props: PropsWithChildren<CustomProps>) {
  const router = useRouter();
  let theme: Theme.Theme = Theme.baseTheme;

  if (router.pathname === '/gardener') {
    theme = Theme.gardenerTheme;
  }
  if (router.pathname === '/husband') {
    theme = Theme.husbandTheme;
  }
  if (router.pathname === '/father') {
    theme = Theme.fatherTheme;
  }
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true,
  });

  function FilterArticles() {
    if (props.articles) {
      if (router.pathname === '/')
        return (
          <ArticlesSection
            articles={props.articles
              .filter((article) => article.pin === true)
              .sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
              )}
          />
        );
      if (router.pathname.includes('/blog')) return null;
      return (
        <ArticlesSection
          articles={props.articles.filter((article) =>
            article.tags?.includes(router.pathname.replace('/', ''))
          )}
        />
      );
    }
    return null;
  }

  return (
    <div
      className={`${theme.textColor} ${theme.textColorDark} ${theme.bgColor} ${theme.bgColorDark}`}
    >
      <div>
        {props.header ? (
          <header ref={ref} className={props.headerStylings}>
            {props.header}
          </header>
        ) : null}
        <Navbar />
        {props.title ? (
          <Title inView={props.header ? inView : false}>{props.title}</Title>
        ) : null}
        <main className="flex min-h-[calc(100vh-8rem)] flex-col">
          {props.children}
        </main>
        {props.articles && router.pathname !== '/login' ? (
          <FilterArticles />
        ) : null}
        <Footer />
      </div>
    </div>
  );
}
