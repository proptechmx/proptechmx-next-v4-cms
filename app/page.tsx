// app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { sanityClient } from '@/lib/sanity.client'
import { homeProjectsQuery } from '@/lib/queries'

export const metadata = {
  title: 'ProptechMX · Inversión inmobiliaria',
  description:
    'Plataforma de fondeo para proyectos inmobiliarios en México. Accede a oportunidades reales con documentos y análisis.',
}

type HomeProject = {
  _id: string
  title?: string
  slug?: string
  summary?: string
  city?: string
  status?: string
  cover?: string
}

export default async function HomePage() {
  // Trae 3 proyectos reales desde Sanity (los más recientes)
  const projects: HomeProject[] =
    (await sanityClient.fetch(homeProjectsQuery)) || []

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      {/* HERO */}
      <section className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Invierte en bienes raíces con datos y transparencia
          </h1>
          <p className="mt-4 max-w-xl text-base opacity-80">
            Oportunidades reales, documentación técnica y seguimiento. Sin
            mínimos altos.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/proyectos"
              className="rounded-md bg-black px-4 py-2 text-white transition hover:opacity-90"
            >
              Ver proyectos
            </Link>
            <Link
              href="/contacto"
              className="rounded-md border px-4 py-2 transition hover:bg-gray-50"
            >
              Hablemos
            </Link>
          </div>

          {/* Mini-badges de confianza */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="rounded-full border px-3 py-1">Datos reales</span>
            <span className="rounded-full border px-3 py-1">
              Documentos técnicos
            </span>
            <span className="rounded-full border px-3 py-1">
              Proceso transparente
            </span>
          </div>
        </div>

        {/* Lado visual */}
        <div className="rounded-xl border bg-white p-3 shadow-sm">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100" />
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="h-20 rounded-md bg-gray-100" />
            <div className="h-20 rounded-md bg-gray-100" />
            <div className="h-20 rounded-md bg-gray-100" />
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS (desde Sanity) */}
      <section className="mt-14">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold">Proyectos destacados</h2>
          <Link
            href="/proyectos"
            className="text-sm text-blue-600 hover:underline"
          >
            Ver todos
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm opacity-70">
            Aún no hay proyectos publicados. Publica en el Studio → Proyectos.
          </p>
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
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="mt-16 rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">¿Cómo funciona?</h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <div className="text-sm font-medium">1) Revisa el proyecto</div>
            <p className="mt-1 text-sm opacity-80">
              Lee el resumen, documentos técnicos y riesgos.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium">2) Aclara dudas</div>
            <p className="mt-1 text-sm opacity-80">
              Escríbenos desde{' '}
              <Link href="/contacto" className="underline">
                Contacto
              </Link>{' '}
              y te respondemos.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium">3) Invierte informado</div>
            <p className="mt-1 text-sm opacity-80">
              Tomamos decisiones basadas en datos y transparencia.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-14 rounded-2xl border bg-gradient-to-r from-gray-50 to-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold">¿Tienes un proyecto?</h4>
            <p className="text-sm opacity-80">
              Cuéntanos y evaluamos su viabilidad con nuestro equipo.
            </p>
          </div>
          <Link
            href="/contacto"
            className="rounded-md bg-black px-4 py-2 text-sm text-white transition hover:opacity-90"
          >
            Enviar mensaje
          </Link>
        </div>
      </section>
    </main>
  )
}
