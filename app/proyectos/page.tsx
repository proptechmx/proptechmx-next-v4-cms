// app/proyectos/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@sanity/client'

export const revalidate = 60 // cachea 60s en prod, suficiente para listar

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production') as string,
  apiVersion: '2024-06-01',
  useCdn: true,
})

const QUERY = `
*[_type=="project"]|order(_createdAt desc){
  title,
  "slug": slug.current,
  city,
  status,
  tir,
  termMonths,
  minTicket,
  summary,
  "cover": coverImage.asset->url
}
`

export default async function ProyectosPage() {
  const projects = await client.fetch(QUERY)
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Proyectos</h1>

      {!projects?.length ? (
        <p className="mt-4 opacity-70">Pronto publicaremos nuevas oportunidades.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p: any) => (
            <Link
              key={p.slug}
              href={`/proyectos/${p.slug}`}
              className="group rounded-2xl border p-3 transition hover:shadow-lg"
            >
              <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
                {p.cover ? (
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : null}
              </div>
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="mt-1 text-sm opacity-70">{p.city} · {p.status}</p>
              <p className="mt-2 text-sm">TIR: {p.tir ?? '-'}% · Plazo: {p.termMonths ?? '-'}m</p>
              <p className="mt-2 line-clamp-2 text-sm opacity-80">{p.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

