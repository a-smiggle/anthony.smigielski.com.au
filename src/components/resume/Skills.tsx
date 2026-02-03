import React from 'react';

import Badge from '../ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export type SkillRow = {
  skill: string;
  category: string;
  level: string;
  years: string;
  keywords: string;
};

export default function Skills({ skills }: { skills: SkillRow[] }) {
  const grouped = skills.reduce<Record<string, SkillRow[]>>((acc, s) => {
    const key = s.category || 'Other';
    acc[key] = acc[key] ?? [];
    acc[key].push(s);
    return acc;
  }, {});

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.keys(grouped)
        .sort()
        .map((cat) => (
          <Card key={cat}>
            <CardHeader>
              <CardTitle>{cat}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {grouped[cat]
                  .sort((a, b) => (b.level || '').localeCompare(a.level || ''))
                  .map((s) => (
                    <Badge key={`${cat}-${s.skill}`}>{s.skill}</Badge>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
