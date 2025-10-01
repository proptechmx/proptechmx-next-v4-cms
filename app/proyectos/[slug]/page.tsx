// app/proyectos/[slug]/page.tsx
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'

const DETAIL = `
*[_type=="project" && slug.current==$slug][0]{
  title,
  "slug": slug.current,
  city,
  status,
  tir,
  termMonths,
  minTicket,
  goal,
  funded,
  risk,
  summary,
  "cover": coverImage.asset->url,
  "docs": documents[]{
    "name": asset->originalFilename,
    "url": asset->url
  }
}
`

export default async function ProyectoDetailPage({ params }: { params: { slug: string } }) {
  const data = await sanityClient.fetch(DETAIL, { slug: params.slug })

  if (!data?.slug) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-xl font-semibold">Proyecto no encontrado</h1>
        <Link href="/proyectos" className="mt-4 inline-block text-blue-600 underline">Volver a proyectos</Link>
      </main>
    )
  }

  const progress = data.goal && data.funded ? Math.min(100, Math.round((data.funded / data.goal) * 100)) : null

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {data.cover && (
        <div className="mb-6 overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.cover} alt={data.title} className="w-full object-cover" />
        </div>
      )}

      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="mt-1 opacity-70">{data.city} · {data.status} · Riesgo: {data.risk}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border p-4 md:grid-cols-4">
        <Stat label="TIR" value={data.tir ? `${data.tir}%` : '-'} />
        <Stat label="Plazo" value={data.termMonths ? `${data.termMonths} meses` : '-'} />
        <Stat label="Ticket mínimo" value={data.minTicket ? `$${data.minTicket.toLocaleString('es-MX')}` : '-'} />
        <Stat label="Meta" value={data.goal ? `$${data.goal.toLocaleString('es-MX')}` : '-'} />
      </div>

      {progress !== null && (
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>Financiado</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full bg-black" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <p className="mt-6 leading-relaxed">{data.summary}</p>

      {data.docs?.length ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">Documentos</h2>
          <ul className="list-inside list-disc space-y-2">
            {data.docs.map((d: any, i: number) => (
              <li key={i}>
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {d.name || 'Documento'}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-10">
        <Link href="/proyectos" className="text-blue-600 underline">← Volver</Link>
      </div>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border p-3">
      <div className="text-xs opacity-70">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  )
}
