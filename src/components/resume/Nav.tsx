import Link from 'next/link';
import React from 'react';

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
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Anthony Smigielski
        </div>
        <nav className="hidden gap-4 md:flex">
          {sections.map((s) => (
            <Link key={s.id} href={`#${s.id}`}>
              <a className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                {s.label}
              </a>
            </Link>
          ))}
        </nav>
        <div className="md:hidden text-xs text-slate-600 dark:text-slate-300">Menu: scroll</div>
      </div>
    </div>
  );
}
