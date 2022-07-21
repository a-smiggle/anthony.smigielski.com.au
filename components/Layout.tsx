import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

import Navbar from './Navbar';
import * as Theme from './Theme';

interface CustomProps {
  children: ReactNode;
}

function Layout(props: CustomProps) {
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
    <div
      className={`h-screen w-screen overflow-hidden transition-colors duration-300 ${theme.textColor} ${theme.textColorDark} ${theme.bgColor} ${theme.bgColorDark}`}
    >
      <Navbar />
      {props.children}
    </div>
  );
}

export default Layout;
