'use client';

import React, { useEffect, useState } from 'react';

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';

  const stored = window.localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (!theme) return;
    window.localStorage.setItem('theme', theme);
    applyTheme(theme);
  }, [theme]);

  if (!theme) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--card)',
        color: 'var(--muted)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          'color-mix(in srgb, var(--card), var(--bg) 10%)';
        (e.currentTarget as HTMLElement).style.color = 'var(--fg)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--card)';
        (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
      }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="text-base leading-none">{isDark ? '☀' : '🌙'}</span>
    </button>
  );
}
