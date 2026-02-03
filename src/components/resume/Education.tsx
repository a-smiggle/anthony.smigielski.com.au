import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';

export type EducationRow = {
  institution: string;
  qualification: string;
  field: string;
  start_date: string;
  end_date: string;
  location: string;
  notes: string;
};

export default function Education({ education }: { education: EducationRow[] }) {
  const sorted = [...education].sort((a, b) => (b.end_date || '').localeCompare(a.end_date || ''));

  return (
    <div className="grid gap-4">
      {sorted.map((e, idx) => (
        <Card key={`${e.institution}-${idx}`}>
          <CardHeader>
            <CardTitle>
              {e.qualification}{e.field ? ` — ${e.field}` : ''}
            </CardTitle>
            <CardDescription>
              {e.institution} • {e.location} • {e.start_date} - {e.end_date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {e.notes ? (
              <p className="text-sm" style={{ color: 'var(--muted-2)' }}>
                {e.notes}
              </p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
