import Link from 'next/link';
import React from 'react';

import ThemeToggle from '../ui/ThemeToggle';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'experience', label: 'Job details' },
  { id: 'portfolio', label: 'Portfolio' },
];

export default function Nav() {
  return (
    <div
      className="sticky top-0 z-40 border-b shadow-sm backdrop-blur"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg), transparent 20%)',
        borderColor: 'var(--card-border)',
      }}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
        <div className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>
          Anthony Smigielski
        </div>
        <div className="flex items-center gap-3">
          <nav className="hidden gap-4 md:flex">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]"
              >
                {s.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
        <div className="text-xs text-[color:var(--muted)] md:hidden">Menu: scroll</div>
      </div>
    </div>
  );
}
