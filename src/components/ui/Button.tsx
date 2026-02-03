import React from 'react';

import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary';

type Props = {
  href?: string;
  target?: string;
  rel?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors';

const variants: Record<Variant, string> = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
  secondary: 'border border-[color:var(--border)] text-[color:var(--fg)]',
};

export default function Button({
  href,
  target,
  rel,
  variant = 'primary',
  className,
  children,
  ...rest
}: Props) {
  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
