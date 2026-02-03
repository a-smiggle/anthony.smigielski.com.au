import React from 'react';

import { cn } from '../../lib/utils';
import { formatYearMonth, toDateOrNull } from '../../lib/date';

export type Job = {
  job_id: string;
  company: string;
  role: string;
  employment_type: string;
  start_date: string;
  end_date: string;
  location: string;
  summary: string;
};

function monthIndex(d: Date) {
  return d.getFullYear() * 12 + d.getMonth();
}

export default function GanttChart({ jobs }: { jobs: Job[] }) {
  const parsed = jobs
    .map((j) => {
      const start = toDateOrNull(j.start_date);
      const end = toDateOrNull(j.end_date) ?? new Date();
      return { ...j, start, end };
    })
    .filter((j) => j.start);

  if (parsed.length === 0) return null;

  const minStart = new Date(
    Math.min(...parsed.map((j) => (j.start ? j.start.getTime() : Date.now()))),
  );
  const maxEnd = new Date(Math.max(...parsed.map((j) => j.end.getTime())));

  const startM = monthIndex(minStart);
  const endM = monthIndex(maxEnd);
  const span = Math.max(1, endM - startM + 1);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}>
        <span>{formatYearMonth(minStart.toISOString().slice(0, 10))}</span>
        <span>{formatYearMonth(maxEnd.toISOString().slice(0, 10))}</span>
      </div>
      <div className="space-y-2">
        {parsed
          .sort((a, b) => (b.start?.getTime() ?? 0) - (a.start?.getTime() ?? 0))
          .map((j) => {
            const s = monthIndex(j.start as Date);
            const e = monthIndex(j.end);
            const leftPct = ((s - startM) / span) * 100;
            const widthPct = ((e - s + 1) / span) * 100;

            return (
              <div key={j.job_id} className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-4">
                  <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
                    {j.role}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>
                    {j.company} • {j.employment_type}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <div
                    className="relative h-7 rounded-md"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--card), var(--bg) 35%)' }}
                  >
                    <div
                      className={cn(
                        'absolute top-1/2 h-4 -translate-y-1/2 rounded-md bg-emerald-500/90',
                      )}
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                      title={`${formatYearMonth(j.start_date)} - ${j.end_date ? formatYearMonth(j.end_date) : 'Present'}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
