import React from 'react';

import Badge from '../ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';

export type PortfolioRow = {
  title: string;
  description: string;
  github_url: string;
  tags: string;
};

export default function Portfolio({ items }: { items: PortfolioRow[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((p) => (
        <Card key={p.github_url || p.title}>
          <CardHeader>
            <CardTitle>{p.title}</CardTitle>
            {p.description ? <CardDescription>{p.description}</CardDescription> : null}
          </CardHeader>
          <CardContent>
            <a
              href={p.github_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-emerald-700 underline hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              View on GitHub
            </a>
            {p.tags ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t) => (
                    <Badge key={`${p.title}-${t}`}>{t}</Badge>
                  ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
