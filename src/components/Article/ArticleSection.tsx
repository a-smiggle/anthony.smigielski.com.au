import React from 'react';

import { Article } from '../../types/Article';
import ArticleCard from './ArticleCard';

export default function ArticlesSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="flex flex-col p-8">
      <h1>Latest Articles</h1>
      <div className="grid gap-2 pt-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
