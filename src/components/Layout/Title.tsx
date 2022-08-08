import React, { PropsWithChildren } from 'react';

interface CustomProps {
  inView: boolean;
}
export default function Title(props: PropsWithChildren<CustomProps>) {
  return (
    <h1
      className={`fixed top-3 z-40 hidden translate-x-[-50%] text-lg transition-all duration-300 lg:left-[50%] lg:flex lg:text-2xl xl:text-3xl ${
        !props.inView
          ? 'translate-y-0 opacity-100'
          : '-translate-y-10 opacity-0'
      }`}
    >
      {props.children}
    </h1>
  );
}
