export function toDateOrNull(value: string | undefined | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatYearMonth(value: string | undefined | null): string {
  if (!value) return '';
  const d = toDateOrNull(value);
  if (!d) return value;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}
