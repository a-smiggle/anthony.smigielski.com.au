import { Button, Dropdown, NavbarV3, SidebarV1 } from '@nextail/core';
import { useLayoutContext, useThemeContext } from '@nextail/providers';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { SiGithub } from 'react-icons/si';
import { TbSettings } from 'react-icons/tb';

import { useUser } from '../../lib/UserContext';
import * as Theme from './Theme';

const MENU = [
  { title: 'Home', link: '/' },
  { title: 'Developer', link: '/developer' },
  { title: 'Father', link: '/father' },
  { title: 'Husband', link: '/husband' },
  { title: 'Gardener', link: '/gardener' },
  { title: 'Blog', link: '/blog' },
];

const DROPDOWN_LOGGED_IN = [
  {
    title: 'Sign Out',
    link: '/auth/sign_out',
  },
  { title: 'Reset Password', link: '/auth/reset' },
];

const DROPDOWN_LOGGED_IN_PROVIDER = [
  {
    title: 'Sign Out',
    link: '/auth/sign_out',
  },
];

const DROPDOWN_LOGGED_OUT = [
  {
    title: 'Login',
    link: '/auth/login',
  },
];

function Navbar() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
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

  const DROPDOWN = () => {
    if (user) {
      if (user.app_metadata.provider === 'github')
        return DROPDOWN_LOGGED_IN_PROVIDER;
      return DROPDOWN_LOGGED_IN;
    }
    return DROPDOWN_LOGGED_OUT;
  };

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
          spacing: { padding: 'p-2' },
        }}
        toggleStylings={{
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
            <div className="text-2xl font-bold uppercase md:hidden">
              Anthony Smigielski
            </div>
          ),
          menu: MENU,
          buttons: (
            <Fragment>
              <Button
                onClick={() => toggleTheme()}
                mainStylings={{
                  spacing: { padding: 'p-2' },
                  background: {
                    backgroundColor: ' ',
                  },
                  border: {
                    borderColor: `border-transparent ${themeColor.borderColorHover} ${themeColor.borderColorDarkHover}`,
                    borderWidth: 'border-b-2',
                  },
                  text: {
                    textColor: `${
                      theme === 'dark'
                        ? 'hover:text-yellow-500'
                        : 'hover:text-sky-500'
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
                  <BsSun className="h-6 w-6" />
                ) : (
                  <BsMoonStars className="h-6 w-6" />
                )}
              </Button>
              <Dropdown
                open={open}
                toggle={setOpen}
                itemStylings={{
                  background: {
                    backgroundColor: ` `,
                  },
                  text: {
                    textColor: `${themeColor.textColor} ${themeColor.textColorDark} ${themeColor.linkColor} ${themeColor.linkColorDark}`,
                    fontWeight: 'font-bold',
                    textDecoration: 'hover:underline',
                  },
                }}
                mainStylings={{
                  sizing: { width: 'w-fit', minWidth: 'min-w-[8rem]' },
                  background: {
                    backgroundColor: `${themeColor.bgColor} ${themeColor.bgColorDark}`,
                  },
                  border: {
                    borderColor: `${themeColor.borderColorHover} ${themeColor.borderColorDarkHover}`,
                    borderWidth: 'border-2',
                  },
                }}
                button={
                  <Button
                    onClick={() => setOpen(!open)}
                    mainStylings={{
                      spacing: { padding: 'p-1' },
                      text: {
                        textColor: `${themeColor.textColor} ${themeColor.textColorDark}`,
                      },
                      background: { backgroundColor: ' ' },
                      border: {
                        borderColor: `border-transparent ${themeColor.borderColorHover} ${themeColor.borderColorDarkHover}`,
                        borderWidth: 'border-b-2',
                      },
                      effect: { boxShadow: ' ' },
                      transitionAnimation: {
                        transitionProperty: 'transition-all',
                        transitionDuration: 'duration-500',
                      },
                    }}
                  >
                    <TbSettings className="h-10 w-10" />
                  </Button>
                }
                items={DROPDOWN()}
              />
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
            layout: { position: 'fixed', zIndex: 'z-50' },
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
