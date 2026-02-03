'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import Badge from '../ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export type SkillRow = {
  skill: string;
  category: string;
  score: string; // 0-100
  years: string;
  keywords: string;
  details: string;
};

function clampScore(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

export default function Skills({ skills }: { skills: SkillRow[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const read = () => setIsDark(document.documentElement.classList.contains('dark'));

    read();

    const observer = new MutationObserver(() => read());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const normalized = useMemo(() => {
    const rows = (skills || [])
      .map((s) => ({
        ...s,
        scoreNum: clampScore(Number.parseFloat(String(s.score ?? '0'))),
        yearsNum: Number.parseFloat(String(s.years ?? '0')),
      }))
      .sort((a, b) => b.scoreNum - a.scoreNum);

    // Keep radar readable; tweak as desired.
    return rows.slice(0, 10);
  }, [skills]);

  const shown = useMemo(() => {
    if (normalized.length === 0) return null;
    if (activeIndex == null) return normalized[0];
    return normalized[activeIndex] ?? normalized[0];
  }, [activeIndex, normalized]);

  const data = useMemo(() => {
    return {
      labels: normalized.map((s) => s.skill),
      datasets: [
        {
          label: 'Skill score',
          data: normalized.map((s) => s.scoreNum),
          backgroundColor: 'rgba(16, 185, 129, 0.20)', // emerald-500
          borderColor: 'rgba(16, 185, 129, 0.85)',
          pointBackgroundColor: 'rgba(16, 185, 129, 1)',
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
      ],
    };
  }, [normalized]);

  const options = useMemo(() => {
    const grid = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(148, 163, 184, 0.35)';
    const label = isDark ? '#cbd5e1' : '#334155'; // slate-300 / slate-700

    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx: any) => `${ctx.label}: ${ctx.formattedValue}/100`,
          },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            showLabelBackdrop: false,
            color: label,
          },
          grid: {
            color: grid,
          },
          angleLines: {
            color: grid,
          },
          pointLabels: {
            color: label,
            font: { size: 12 },
          },
        },
      },
      onHover: (_event: unknown, elements: any[]) => {
        if (!elements || elements.length === 0) {
          setActiveIndex(null);
          return;
        }
        const el = elements[0];
        setActiveIndex(typeof el.index === 'number' ? el.index : null);
      },
    };
  }, [isDark]);

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Skill radar</CardTitle>
          <CardDescription>
            Scores are 0–100 from <code>src/data/skills.csv</code>. Hover a point to see details on
            the right.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {normalized.length === 0 ? (
            <div className="text-sm" style={{ color: 'var(--muted)' }}>
              No skills found.
            </div>
          ) : (
            <div className="mx-auto max-w-md">
              <Radar data={data as any} options={options as any} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Selected skill</CardDescription>
        </CardHeader>
        <CardContent>
          {shown ? (
            <div className="space-y-3">
              <div>
                <div className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>
                  {shown.skill}
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {shown.category ? <Badge>{shown.category}</Badge> : null}
                  <Badge>{shown.scoreNum}/100</Badge>
                  {shown.years ? <Badge>{shown.years} yrs</Badge> : null}
                </div>
              </div>

              {shown.details ? (
                <p className="text-sm" style={{ color: 'var(--muted-2)' }}>
                  {shown.details}
                </p>
              ) : null}

              {shown.keywords ? (
                <div className="flex flex-wrap gap-2">
                  {shown.keywords
                    .split(',')
                    .map((t: string) => t.trim())
                    .filter(Boolean)
                    .map((t: string) => (
                      <Badge key={`${shown.skill}-${t}`}>{t}</Badge>
                    ))}
                </div>
              ) : null}

              <div className="text-xs" style={{ color: 'var(--muted)' }}>
                Tip: adjust scores and details in <code>src/data/skills.csv</code>.
              </div>
            </div>
          ) : (
            <div className="text-sm" style={{ color: 'var(--muted)' }}>
              No selection.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}