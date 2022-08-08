import { Card } from '@nextail/core';
import { useThemeContext } from '@nextail/providers';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import { useUser } from '../../lib/UserContext';
import { Article } from '../../types/Article';

export default function Confirmation({ articles }: { articles: Article[] }) {
  const [loading, setLoading] = useState(true);
  const { theme } = useThemeContext();
  const { user } = useUser();

  useEffect(() => {
    if (user) Router.push('/');
    else setLoading(false);
  }, []);

  return (
    <Layout title="Anthony Smigielski" articles={articles}>
      {loading ? null : (
        <div
          className="flex h-[calc(100vh-8rem)] w-screen flex-row items-center justify-center bg-cover"
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
              <h2>Confirmation Needed.</h2>
              <p>
                An email will be sent to your email inbox. Click on the confirm
                you email link to finalise your account.
              </p>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
}
