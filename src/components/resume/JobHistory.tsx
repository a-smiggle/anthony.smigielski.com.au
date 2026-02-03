import React from 'react';

import Badge from '../ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';

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

export default function JobHistory({
  jobs,
  jobDetails,
}: {
  jobs: Job[];
  jobDetails: Array<{ job_id: string; bullet: string }>;
}) {
  const bulletsByJob = jobDetails.reduce<Record<string, string[]>>((acc, row) => {
    acc[row.job_id] = acc[row.job_id] ?? [];
    acc[row.job_id].push(row.bullet);
    return acc;
  }, {});

  const sorted = [...jobs].sort((a, b) => (b.start_date || '').localeCompare(a.start_date || ''));

  return (
    <div className="space-y-4">
      {sorted.map((j) => (
        <Card key={j.job_id}>
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle>
                  {j.role}{' '}
                  <span style={{ color: 'var(--muted)' }}>@ {j.company}</span>
                </CardTitle>
                <CardDescription>
                  {j.start_date} - {j.end_date || 'Present'} • {j.location}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge>{j.employment_type}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm" style={{ color: 'var(--muted-2)' }}>
              {j.summary}
            </p>
            {bulletsByJob[j.job_id]?.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm" style={{ color: 'var(--muted-2)' }}>
                {bulletsByJob[j.job_id].map((b, idx) => (
                  <li key={`${j.job_id}-${idx}`}>{b}</li>
                ))}
              </ul>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
