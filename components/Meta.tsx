import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const meta = {
  title: 'Anthony Smigielski',
  siteName: 'anthony.smigielski.com.au',
  description:
    'My online portfolio and blog for not only my developer work but for my life.',
  url: 'https://anthony.smigielski.com.au',
  image: 'https://anthony.smigielski.com.au/favicon/Logo.jpg',
  type: 'website',
  robots: 'follow, index',
};

function Meta() {
  const router = useRouter();

  function capitalizeFirstLetter(item: string) {
    return item.charAt(1).toUpperCase() + item.slice(2);
  }

  return (
    <Head>
      <title>
        {router.pathname !== '/' && !router.pathname.includes('id')
          ? `${capitalizeFirstLetter(router.pathname)} - `
          : ''}
        Anthony Smigleksi
      </title>
      <meta name="robots" content={meta.robots} />
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={`${meta.url}${router.pathname}`} />

      {/* Open Graph */}
      <meta property="og:url" content={`${meta.url}${router.pathname}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" name="image" content={meta.image} />

      {/* Icons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#10B981" />
      <meta name="theme-color" content="#10B981" />
    </Head>
  );
}

export default Meta;
