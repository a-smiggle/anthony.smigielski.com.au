import React from 'react';

import Education from '../components/resume/Education';
import GanttChart from '../components/resume/GanttChart';
import JobHistory from '../components/resume/JobHistory';
import Nav from '../components/resume/Nav';
import Portfolio from '../components/resume/Portfolio';
import Skills from '../components/resume/Skills';
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
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
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
                <a
                  href="#portfolio"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  View portfolio
                </a>
                <a
                  href="#experience"
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                >
                  View experience
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/30">
              <div className="text-sm font-semibold">Quick links</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <a className="text-emerald-700 underline dark:text-emerald-400" href="#skills">
                  Skills
                </a>
                <a className="text-emerald-700 underline dark:text-emerald-400" href="#education">
                  Education
                </a>
                <a className="text-emerald-700 underline dark:text-emerald-400" href="#timeline">
                  Job timeline
                </a>
                <a className="text-emerald-700 underline dark:text-emerald-400" href="#portfolio">
                  GitHub portfolio
                </a>
              </div>
            </div>
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

        <Section
          id="certifications"
          title="Certifications"
          subtitle="From src/data/certifications.csv"
        >
          <div className="rounded-xl border border-slate-200 p-5 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-200">
            <ul className="list-disc space-y-1 pl-5">
              {(certifications || []).map((c: any, idx: number) => (
                <li key={`${c.name}-${idx}`}>
                  <span className="font-medium">{c.name}</span> — {c.issuer}{' '}
                  {c.credential_url ? (
                    <a
                      className="ml-2 text-emerald-700 underline dark:text-emerald-400"
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
          </div>
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
