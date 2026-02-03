import React from 'react';

import Education from '../components/resume/Education';
import GanttChart from '../components/resume/GanttChart';
import JobHistory from '../components/resume/JobHistory';
import Nav from '../components/resume/Nav';
import Portfolio from '../components/resume/Portfolio';
import Skills from '../components/resume/Skills';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import { loadCsvFromDataDir } from '../lib/csv';

export const dynamic = 'force-static';

export default function HomePage() {
  const skills = loadCsvFromDataDir('skills.csv');
  const education = loadCsvFromDataDir('education.csv');
  const certifications = loadCsvFromDataDir('certifications.csv');
  const jobs = loadCsvFromDataDir('jobs.csv');
  const jobDetails = loadCsvFromDataDir('job_details.csv');
  const portfolio = loadCsvFromDataDir('portfolio.csv');

  return (
    <div className="min-h-screen">
      <Nav />

      <header className="border-b border-slate-200 dark:border-slate-800">
        <Container className="py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Anthony Smigielski</h1>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
                Full-stack developer. This page is driven by CSV data so the same source can power a
                Power BI resume.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="#portfolio" variant="primary">
                  View portfolio
                </Button>
                <Button
                  href="#experience"
                  variant="secondary"
                  className="hover:bg-[color:color-mix(in_srgb,var(--card),var(--bg)_10%)]"
                >
                  View experience
                </Button>
              </div>
            </div>

            <Card className="p-0">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-sm">Quick links</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <a className="underline" href="#skills">
                    Skills
                  </a>
                  <a className="underline" href="#education">
                    Education
                  </a>
                  <a className="underline" href="#timeline">
                    Job timeline
                  </a>
                  <a className="underline" href="#portfolio">
                    GitHub portfolio
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </header>

      <main>
        <Section
          id="overview"
          title="Overview"
          subtitle="A concise summary (edit this copy in src/app/page.tsx)"
        >
          <div className="prose max-w-none dark:prose-invert">
            <p>
              Replace this overview with a short professional summary: your specialties, industries,
              outcomes, and what you are looking for.
            </p>
            <p>
              All structured sections below (skills, education, certifications, job history,
              portfolio) are loaded from CSV files in <code>src/data</code>.
            </p>
          </div>
        </Section>

        <Section id="skills" title="Skills" subtitle="From src/data/skills.csv">
          <Skills skills={skills as any} />
        </Section>

        <Section id="education" title="Education" subtitle="From src/data/education.csv">
          <Education education={education as any} />
        </Section>

        <Section
          id="certifications"
          title="Certifications"
          subtitle="From src/data/certifications.csv"
        >
          <Card>
            <CardContent>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-200">
                {(certifications || []).map((c: any, idx: number) => (
                  <li key={`${c.name}-${idx}`}>
                    <span className="font-medium">{c.name}</span> — {c.issuer}{' '}
                    {c.credential_url ? (
                      <a
                        className="ml-2 underline"
                        href={c.credential_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        credential
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Section>

        <Section
          id="timeline"
          title="Gantt chart of job history"
          subtitle="From src/data/jobs.csv (supports overlapping roles)"
        >
          <GanttChart jobs={jobs as any} />
        </Section>

        <Section
          id="experience"
          title="Job history details"
          subtitle="From src/data/jobs.csv + src/data/job_details.csv"
        >
          <JobHistory jobs={jobs as any} jobDetails={jobDetails as any} />
        </Section>

        <Section id="portfolio" title="Portfolio" subtitle="GitHub links from src/data/portfolio.csv">
          <Portfolio items={portfolio as any} />
        </Section>
      </main>

      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
        <Container>
          <div>© {new Date().getFullYear()} Anthony Smigielski</div>
          <div className="mt-1">
            Data source: CSV files in <code>src/data</code>
          </div>
        </Container>
      </footer>
    </div>
  );
}
