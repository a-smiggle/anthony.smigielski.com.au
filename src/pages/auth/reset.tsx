import { Button, Card } from '@nextail/core';
import { useThemeContext } from '@nextail/providers';
import Router from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { AiFillUnlock } from 'react-icons/ai';

import Layout from '../../components/Layout';
import Supabase from '../../lib/Supabase';
import { Article } from '../../types/Article';

export default function Reset({ articles }: { articles: Article[] }) {
  const { theme } = useThemeContext();
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleReset = async () => {
    const { error } = await Supabase.auth.update({ password: cPassword });
    // eslint-disable-next-line no-console
    if (error) console.error('Error Ressetting Password');
    else Router.push('/auth/reset_verify');
  };

  useEffect(() => {
    if (password === cPassword) {
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  }, [password, cPassword]);

  function CardData() {
    return (
      <Fragment>
        <h1 className="pb-4 text-center text-emerald-500">Reset Password</h1>

        <form>
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-emerald-500">Password</span>
              <input
                type="password"
                placeholder=""
                value={password}
                minLength={8}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={`mt-0 block w-full rounded border-2 px-0.5 focus:ring-0 dark:bg-slate-700 ${
                  password.length <= 8
                    ? 'border-x-transparent border-t-transparent border-b-red-300 hover:border-red-500 focus:border-red-500'
                    : 'border-x-transparent border-t-transparent border-b-emerald-500 hover:border-emerald-500 focus:border-emerald-500'
                }`}
              />
            </label>
            <label className="block">
              <span className="text-emerald-500">Confirm Password</span>
              <input
                type="password"
                placeholder=""
                value={cPassword}
                minLength={8}
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
                className={`mt-0 block w-full rounded border-2 px-0.5 focus:ring-0 dark:bg-slate-700 ${
                  showErrorMessage || cPassword.length <= 8
                    ? 'border-x-transparent border-t-transparent border-b-red-300 hover:border-red-500 focus:border-red-500'
                    : 'border-x-transparent border-t-transparent border-b-emerald-500 hover:border-emerald-500 focus:border-emerald-500'
                }`}
              />
            </label>
          </div>
          <div className="flex justify-center py-4">
            <Button
              disabled={
                showErrorMessage || password.length < 8 || cPassword.length < 8
              }
              mainStylings={{
                className:
                  'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
              }}
              onClick={() => handleReset()}
            >
              <AiFillUnlock /> Reset
            </Button>
          </div>
        </form>
      </Fragment>
    );
  }

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
            {CardData()}
          </Card>
        </div>
      </div>
    </Layout>
  );
}
