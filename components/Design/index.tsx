import { Button } from '@nextail/core';
import { useThemeContext } from '@nextail/providers';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

import Default from './Default';
import Father from './Father';
import Gardener from './Gardner';
import Husband from './Husband';

function Design() {
  const router = useRouter();
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Fragment>
      <div className="flex justify-between">
        <h1>Design</h1>
        <Button
          onClick={() => toggleTheme()}
          mainStylings={{
            border: {
              borderWidth: 'border-2',
              borderRadius: 'rounded-full',
              borderColor: `${
                theme === 'dark' ? 'border-yellow-900' : 'border-sky-500'
              }`,
            },
            spacing: { padding: 'p-2' },
            background: {
              backgroundColor: `${
                theme === 'dark'
                  ? 'bg-yellow-500 hover:bg-yellow-200'
                  : 'bg-sky-900 hover:bg-black'
              }`,
            },
            text: {
              textColor: `${
                theme === 'dark' ? 'text-yellow-900' : 'text-sky-500'
              }`,
            },
            effect: { boxShadow: ' ' },
            transitionAnimation: {
              transitionProperty: 'transition-all',
              transitionDuration: 'duration-500',
            },
          }}
        >
          {theme === 'dark' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </Button>
      </div>

      <p>This is the current theming on this page.</p>
      {router.pathname === '/gardener' ? <Gardener /> : null}
      {router.pathname === '/husband' ? <Husband /> : null}
      {router.pathname === '/father' ? <Father /> : null}
      {router.pathname !== '/gardener' &&
      router.pathname !== '/husband' &&
      router.pathname !== '/father' ? (
        <Default />
      ) : null}
    </Fragment>
  );
}

export default Design;
