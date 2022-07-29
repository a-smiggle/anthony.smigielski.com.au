import { Button, Card } from '@nextail/core';
import { useLocation } from '@nextail/hooks';
import { useThemeContext } from '@nextail/providers';
import Router from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { AiFillUnlock } from 'react-icons/ai';
import { SiGithub } from 'react-icons/si';

import Layout from '../components/Layout';
import Supabase from '../lib/Supabase';
import { useUser } from '../lib/UserContext';
import { Article } from '../types/Article';

export default function Login({ articles }: { articles: Article[] }) {
  const location = useLocation();
  const [previous, setPrevious] = useState('/');
  const { user } = useUser();

  const { theme } = useThemeContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [login, setLogin] = useState(true);
  const [forgotten, setForgotten] = useState(false);
  const handleCPassword = (e: any) => {
    setCPassword(e.target.value);
    setIsCPasswordDirty(true);
  };
  const handleSignUp = async () => {
    if (!showErrorMessage)
      await Supabase.auth.signUp(
        { email, password },
        { redirectTo: location.origin + previous }
      );
  };
  const handleLogin = async () => {
    if (!showErrorMessage)
      await Supabase.auth.signIn(
        { email, password },
        { redirectTo: location.origin + previous }
      );
  };
  const handleForgottenPassword = async () => {
    await Supabase.auth.api.resetPasswordForEmail(email);
  };

  useEffect(() => {
    const prevPath = window.sessionStorage.getItem('prevPath');
    if (prevPath) setPrevious(prevPath);
    else setPrevious('/');
    if (user) Router.push(previous);
  }, []);

  useEffect(() => {
    if (isCPasswordDirty) {
      if (password === cPassword) {
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
      }
    }
  }, [cPassword, password]);

  function CardData() {
    if (forgotten)
      return (
        <Fragment>
          <h1 className="pb-4 text-center text-emerald-500">
            Forgotten Password
          </h1>
          <form>
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-emerald-500">Email address</span>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="mt-0 block w-full rounded border-2 border-x-transparent border-t-transparent border-b-emerald-500 px-0.5 hover:border-emerald-500 focus:border-emerald-500 focus:ring-0 dark:bg-slate-700"
                />
              </label>
            </div>
            <div className="flex justify-center py-4">
              <Button
                mainStylings={{
                  className:
                    'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
                }}
                onClick={() => handleForgottenPassword()}
              >
                Reset Password
              </Button>
            </div>
            <div className="flex justify-center pb-4">
              <Button
                mainStylings={{
                  className:
                    'w-full justify-center rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold bg-red-500 hover:text-white transition-colors duration-300 active:scale-90',
                }}
                onClick={() => setForgotten(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Fragment>
      );
    if (login)
      return (
        <Fragment>
          <h1 className="pb-4 text-center text-emerald-500">Log in</h1>
          <div className="flex justify-center">
            <Button
              mainStylings={{
                className:
                  'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
              }}
              onClick={async () =>
                Supabase.auth.signIn(
                  { provider: 'github' },
                  { redirectTo: location.origin + previous }
                )
              }
            >
              <SiGithub /> With Github
            </Button>
          </div>

          <div className="relative flex items-center py-5">
            <div className="grow border-t border-emerald-400"></div>
            <span className="mx-4 shrink text-emerald-400">or with Email</span>
            <div className="grow border-t border-emerald-400"></div>
          </div>
          <form>
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-emerald-500">Email address</span>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="mt-0 block w-full rounded border-2 border-x-transparent border-t-transparent border-b-emerald-500 px-0.5 hover:border-emerald-500 focus:border-emerald-500 focus:ring-0 dark:bg-slate-700"
                />
              </label>
              <label className="block">
                <span className="text-emerald-500">Password</span>
                <input
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="mt-0 block w-full rounded border-2 border-x-transparent border-t-transparent border-b-emerald-500 px-0.5 hover:border-emerald-500 focus:border-emerald-500 focus:ring-0 dark:bg-slate-700"
                />
              </label>
            </div>
            <p
              onClick={() => setForgotten(true)}
              className="pt-4 text-right text-emerald-500 hover:cursor-pointer hover:underline"
            >
              Forgot Password.
            </p>
            <div className="flex justify-center py-4">
              <Button
                mainStylings={{
                  className:
                    'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
                }}
                onClick={() => handleLogin()}
              >
                <AiFillUnlock /> Sign In
              </Button>
            </div>
          </form>

          <p
            onClick={() => setLogin(false)}
            className="pt-4 text-center text-emerald-500 hover:cursor-pointer hover:underline"
          >
            Don&apos;t have an account? Sign up
          </p>
        </Fragment>
      );
    return (
      <Fragment>
        <h1 className="pb-4 text-center text-emerald-500">Sign up</h1>
        <div className="flex justify-center">
          <Button
            mainStylings={{
              className:
                'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
            }}
            onClick={async () =>
              Supabase.auth.signIn(
                { provider: 'github' },
                { redirectTo: location.origin + previous }
              )
            }
          >
            <SiGithub /> With Github
          </Button>
        </div>
        <div className="relative flex items-center py-5">
          <div className="grow border-t border-emerald-400"></div>
          <span className="mx-4 shrink text-emerald-400">or with Email</span>
          <div className="grow border-t border-emerald-400"></div>
        </div>
        <form>
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-emerald-500">Email address</span>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="mt-0 block w-full rounded border-2 border-x-transparent border-t-transparent border-b-emerald-500 px-0.5 hover:border-emerald-500 focus:border-emerald-500 focus:ring-0 dark:bg-slate-700"
              />
            </label>
            <label className="block">
              <span className="text-emerald-500">Password</span>
              <input
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="mt-0 block w-full rounded border-2 border-x-transparent border-t-transparent border-b-emerald-500 px-0.5 hover:border-emerald-500 focus:border-emerald-500 focus:ring-0 dark:bg-slate-700"
              />
            </label>
            <label className="block">
              <span>Confirm Password</span>
              <input
                type="password"
                placeholder=""
                value={cPassword}
                onChange={handleCPassword}
                className={`mt-0 block w-full rounded border-2 border-x-transparent border-t-transparent px-0.5 focus:ring-0 dark:bg-slate-700 ${
                  !showErrorMessage
                    ? 'border-b-emerald-500 hover:border-emerald-500 focus:border-emerald-500'
                    : 'border-b-red-500 hover:border-red-500 focus:border-red-500'
                }`}
              />
            </label>
          </div>
          <div className="flex justify-center py-4">
            <Button
              mainStylings={{
                className:
                  'w-full justify-center border border-emerald-500 rounded px-4 py-2 flex gap-2 items-center text-lg font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-300 active:scale-90',
              }}
              onClick={() => handleSignUp()}
            >
              <AiFillUnlock /> Sign In
            </Button>
          </div>
        </form>

        <p
          onClick={() => setLogin(true)}
          className="text-emerald-500 hover:cursor-pointer hover:underline"
        >
          Already have an account? Login in
        </p>
      </Fragment>
    );
  }

  return (
    <Layout title="Anthony Smigielski" articles={articles}>
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
            {CardData()}
          </Card>
        </div>
      </div>
    </Layout>
  );
}
