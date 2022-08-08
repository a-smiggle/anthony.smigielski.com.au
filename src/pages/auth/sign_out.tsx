import { Button, Card } from '@nextail/core';
import { useThemeContext } from '@nextail/providers';
import Router from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import Supabase from '../../lib/Supabase';
import { useUser } from '../../lib/UserContext';
import { Article } from '../../types/Article';

export default function SignOut({ articles }: { articles: Article[] }) {
  const { theme } = useThemeContext();
  const { user } = useUser();
  const [previous, setPrevious] = useState('/');

  useEffect(() => {
    const prevPath = window.sessionStorage.getItem('prevPath') || '/';
    setPrevious(prevPath);
  }, []);

  const handleSignOut = async () => {
    const { error } = await Supabase.auth.signOut();

    if (!error) Router.push(previous);
  };

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
            {user ? (
              <Fragment>
                <h2 className="pb-4">Sign Out</h2>
                <Button
                  mainStylings={{
                    className:
                      'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
                  }}
                  onClick={() => handleSignOut()}
                >
                  Sign Out
                </Button>
              </Fragment>
            ) : (
              <h2>You are not logged in.</h2>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}
