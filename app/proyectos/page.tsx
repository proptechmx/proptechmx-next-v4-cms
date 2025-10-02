// app/proyectos/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { sanityClient } from '@/lib/sanity.client'
import { projectsListQuery } from '@/lib/queries'

export const metadata = {
  title: 'Proyectos · ProptechMX',
  description:
    'Listado de oportunidades reales de inversión inmobiliaria con documentación y análisis.',
}

type ProjectItem = {
  _id: string
  title?: string
  slug?: string
  summary?: string
  city?: string
  status?: string
  cover?: string
}

type PageProps = {
  searchParams?: { status?: string }
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const status = searchParams?.status?.trim() || undefined

  const projects: ProjectItem[] =
    (await sanityClient.fetch(projectsListQuery, { status })) || []

  const filters = [
    { label: 'Todos', value: undefined },
    { label: 'Disponible', value: 'Disponible' },
    { label: 'En curso', value: 'En curso' },
    { label: 'Finalizado', value: 'Finalizado' },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Encabezado */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Proyectos</h1>
        <p className="mt-2 max-w-2xl text-sm opacity-80">
          Oportunidades reales con análisis y documentación. Filtra por estado
          si lo deseas.
        </p>
      </header>

      {/* Filtros simples por estado (querystring ?status=...) */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = (status ?? '') === (f.value ?? '')
          const href = f.value ? `/proyectos?status=${encodeURIComponent(f.value)}` : '/proyectos'
          return (
            <Link
              key={f.label}
              href={href}
              className={[
                'rounded-full border px-3 py-1 text-sm transition',
                active ? 'bg-black text-white border-black' : 'hover:bg-gray-50',
              ].join(' ')}
            >
              {f.label}
            </Link>
          )
        })}
      </div>

      {/* Grid de tarjetas */}
      {projects.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="text-sm opacity-80">
            No encontramos proyectos {status ? `con estado “${status}”` : 'publicados'}.
          </p>
          <p className="mt-1 text-sm opacity-70">
            Publica proyectos en el Studio (dataset <strong>production</strong>) y vuelve a cargar.
          </p>
          <div className="mt-4">
            <Link href="/contacto" className="text-sm text-blue-600 underline">
              ¿Tienes un proyecto? Contáctanos
            </Link>
          </div>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p._id} className="rounded-xl border bg-white shadow-sm">
              <Link
                href={`/proyectos/${p.slug}`}
                className="block overflow-hidden rounded-t-xl"
              >
                <div className="relative aspect-[16/10] w-full bg-gray-100">
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={p.title || 'Proyecto'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
              </Link>

              <div className="p-4">
                <Link
                  href={`/proyectos/${p.slug}`}
                  className="line-clamp-1 text-base font-medium hover:underline"
                >
                  {p.title || 'Proyecto'}
                </Link>

                <div className="mt-1 text-xs text-gray-500">
                  <span>{p.city || 'Ubicación —'}</span>
                  <span className="mx-1">·</span>
                  <span>{p.status || 'Estado —'}</span>
                </div>

                <p className="mt-2 line-clamp-3 text-sm opacity-80">
                  {p.summary ||
                    'Oportunidad inmobiliaria con análisis y documentación para inversionistas.'}
                </p>

                <div className="mt-4">
                  <Link
                    href={`/proyectos/${p.slug}`}
                    className="inline-block rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

