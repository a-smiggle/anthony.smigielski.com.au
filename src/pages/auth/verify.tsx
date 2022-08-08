import { Card } from '@nextail/core';
import { useThemeContext } from '@nextail/providers';
import React from 'react';

import Layout from '../../components/Layout';
import { Article } from '../../types/Article';

export default function Verify({ articles }: { articles: Article[] }) {
  const { theme } = useThemeContext();

  return (
    <Layout title="Anthony Smigielski" articles={articles}>
      <div
        className="flex min-h-[calc(100vh-8rem)] w-screen flex-row items-center justify-center bg-cover"
        style={{
          backgroundImage:
            theme === 'light'
              ? 'url(/images/bg-light.png)'
              : 'url(/images/bg-dark.png)',
        }}
      >
        <div>
          <Card
            mainStylings={{
              border: {
                borderWidth: 'border-2',
                borderColor: 'border-emerald-500',
              },
              background: {
                backgroundColor: 'bg-white/90 dark:bg-slate-800/90 ',
              },
              sizing: { width: 'md:w-96' },
            }}
          >
            <h2>Email conformation complete.</h2>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
