// app/proyectos/loading.tsx
export default function LoadingProjects() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-4 w-80 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mb-6 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="aspect-[16/10] w-full animate-pulse bg-gray-200" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200" />
              <div className="mt-3 h-8 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
