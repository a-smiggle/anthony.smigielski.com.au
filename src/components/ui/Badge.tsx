import React from 'react';

import { cn } from '../../lib/utils';

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        'border-[color:var(--card-border)] bg-[color:var(--chip-bg)] text-[color:var(--muted)]',
        className,
      )}
    >
      {children}
    </span>
  );
}
