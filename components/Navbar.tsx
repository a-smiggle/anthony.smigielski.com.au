import { Button, NavbarV3, SidebarV1 } from '@nextail/core';
import { useLayoutContext, useThemeContext } from '@nextail/providers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { SiGithub } from 'react-icons/si';

import * as Theme from './Theme';

const MENU = [
  { title: 'Home', link: '/' },
  { title: 'Developer', link: '/developer' },
  { title: 'Father', link: '/father' },
  { title: 'Husband', link: '/husband' },
  { title: 'Gardener', link: '/gardener' },
  { title: 'Blog', link: '/blog' },
];

function Navbar() {
  const { theme, toggleTheme } = useThemeContext();
  const { leftDrawerOpen, setLeftDrawerOpen } = useLayoutContext();
  const router = useRouter();
  let themeColor: Theme.Theme = Theme.baseTheme;

  if (router.pathname === '/gardener') {
    themeColor = Theme.gardenerTheme;
  }
  if (router.pathname === '/husband') {
    themeColor = Theme.husbandTheme;
  }
  if (router.pathname === '/father') {
    themeColor = Theme.fatherTheme;
  }

  return (
    <Fragment>
      <NavbarV3
        toggle={setLeftDrawerOpen}
        open={leftDrawerOpen}
        linkStylings={{
          text: {
            textColor: `${themeColor.textColor} ${themeColor.textColorDark}`,
            fontWeight: 'font-bold',
          },
          border: {
            borderColor: `border-transparent ${themeColor.borderColorHover} ${themeColor.borderColorDarkHover}`,
            borderWidth: 'border-b-2',
          },
          background: {
            backgroundColor: ' ',
          },
          effect: { boxShadow: ' ' },
        }}
        mainStylings={{
          layout: { position: 'sticky', zIndex: 'z-40', top: 'top-0' },
          background: {
            backgroundColor: `${themeColor.bgColor} ${themeColor.bgColorDark}`,
          },
          effect: { boxShadow: 'shadow-sm' },
        }}
        dropdownStylings={{ layout: { right: ' ' } }}
        data={{
          brand: (
            <div className="text-2xl font-bold uppercase  md:hidden">
              Anthony Smigielski
            </div>
          ),
          menu: MENU,
          buttons: (
            <Fragment>
              <Link href="https://github.com/a-smiggle" target="_blink">
                <SiGithub
                  className={`h-10 w-10 hover:scale-105 hover:cursor-pointer md:mr-4 ${themeColor.textColor} ${themeColor.textColorDark} transition-colors duration-300`}
                />
              </Link>
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
            </Fragment>
          ),
        }}
      />
      <div
        className={`${
          leftDrawerOpen ? 'absolute top-[4rem] z-10 h-screen' : 'hidden'
        }`}
      >
        <SidebarV1
          mainStylings={{
            layout: { position: 'fixed' },
            sizing: { height: 'h-[calc(100vh-4rem)]' },
            background: {
              backgroundColor: `${themeColor.bgColor} ${themeColor.bgColorDark}`,
            },
          }}
          menuStylings={{
            text: {
              textColor: `${themeColor.textColor} ${themeColor.textColorDark}`,
            },
          }}
          menuActiveStylings={{
            text: {
              textColor: `${themeColor.textColor} ${themeColor.textColorDark} ${themeColor.linkColor} ${themeColor.linkColorDark}`,
              textDecoration: 'underline',
            },
          }}
          data={{
            menu: MENU,
            bottom: (
              <div className="flex justify-between">
                <a
                  href="https://github.com/a-smiggle"
                  target="_blink"
                  className="text-black transition-colors duration-300 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-500"
                >
                  <SiGithub
                    className={`h-10 w-10 hover:scale-105 hover:cursor-pointer md:mr-4 ${themeColor.textColor} ${themeColor.textColorDark} transition-colors duration-300`}
                  />
                </a>
                <Button
                  onClick={() => toggleTheme()}
                  mainStylings={{
                    border: {
                      borderWidth: 'border-2',
                      borderRadius: 'rounded-full',
                      borderColor: `${
                        theme === 'dark'
                          ? 'border-yellow-900'
                          : 'border-sky-500'
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
            ),
          }}
          toggle={setLeftDrawerOpen}
          open={leftDrawerOpen}
        />
      </div>
    </Fragment>
  );
}

export default Navbar;
