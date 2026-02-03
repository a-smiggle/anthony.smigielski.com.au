export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-4">
      <div>
        <h1 className="text-3xl font-bold">404</h1>
        <p className="mt-2" style={{ color: 'var(--muted)' }}>
          Page not found.
        </p>
      </div>
    </main>
  );
}
