import type { Metadata } from 'next';
import React from 'react';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Anthony Smigielski',
  description: 'Resume-style single page website driven by CSV data.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
