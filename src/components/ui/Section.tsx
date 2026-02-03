import React from 'react';

import { cn } from '../../lib/utils';
import Container from './Container';

export default function Section({
  id,
  title,
  subtitle,
  className,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-16', className)}>
      <Container>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-slate-600 dark:text-slate-300">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
