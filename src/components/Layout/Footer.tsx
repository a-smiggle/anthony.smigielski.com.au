import { Modal } from '@nextail/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SiGithub } from 'react-icons/si';

import Design from '../Design';
import * as Theme from './Theme';

function Footer() {
  const [design, setDesign] = useState(false);
  const router = useRouter();
  let theme: Theme.Theme = Theme.baseTheme;

  if (router.pathname === '/gardener') {
    theme = Theme.gardenerTheme;
  }
  if (router.pathname === '/husband') {
    theme = Theme.husbandTheme;
  }
  if (router.pathname === '/father') {
    theme = Theme.fatherTheme;
  }
  return (
    <footer className="w-full border-t p-4 transition-colors duration-200">
      <div className="flex flex-col">
        <div className="mt-4 flex flex-col md:mt-0 md:flex-row">
          <nav className="flex flex-1 flex-col items-center justify-center font-bold md:flex-row md:items-end md:justify-between md:pr-5">
            <a
              onClick={() => setDesign(true)}
              className={`hover:underline ${theme.linkColor} ${theme.linkColorDark}`}
            >
              Design
            </a>
            <Link href="/contact">
              <a
                className={`hover:underline ${theme.linkColor} ${theme.linkColorDark}`}
              >
                Contact Me
              </a>
            </Link>
          </nav>
          <div className="mx-auto mt-4 h-px w-11 rounded-full md:hidden"></div>
          <div className="mt-4 flex flex-1 items-center justify-center md:mt-0">
            <SiGithub
              title="Source Code"
              href="https://github.com/a-smiggle/anthony.smigielski.com.au"
              className={`h-6 w-6 ${theme.linkColor} ${theme.linkColorDark} transition-all duration-150 hover:scale-125`}
            />
          </div>
          <div className="mt-4 flex flex-1 flex-col items-center justify-end md:mt-0 md:flex-row md:items-start md:gap-2 md:pl-5">
            <span className="">© 2022</span>
            <span className="mt-2 md:mt-0">Created by Anthony Smigielski</span>
          </div>
        </div>
      </div>
      <Modal
        mainStylings={{
          background: {
            backgroundColor: `${theme.bgColor} ${theme.bgColorDark}`,
          },
          border: {
            borderColor: `${theme.borderColor} ${theme.borderColorDark}`,
          },
          text: { textColor: `${theme.textColor} ${theme.textColorDark}` },
          spacing: { margin: 'mx-4' },
          sizing: { width: 'md:w-3/4', maxHeight: 'max-h-[80%]' },
          layout: { overflow: 'overflow-y-auto' },
        }}
        open={design}
        toggle={setDesign}
      >
        <Design />
      </Modal>
    </footer>
  );
}

export default Footer;
