import { readFileSync } from 'fs';
import path from 'path';

export type CsvRow = Record<string, string>;

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((v) => v.trim());
}

export function parseCsv(content: string): CsvRow[] {
  const lines = content
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .filter((l) => l.trim().length > 0);

  if (lines.length === 0) return [];
  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const row: CsvRow = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] ?? '';
    });
    return row;
  });
}

export function loadCsvFromDataDir(fileName: string): CsvRow[] {
  const p = path.join(process.cwd(), 'src', 'data', fileName);
  const content = readFileSync(p, 'utf8');
  return parseCsv(content);
}
