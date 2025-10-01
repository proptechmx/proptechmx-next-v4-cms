// app/page.tsx
import Link from 'next/link'

export const metadata = {
  title: 'ProptechMX · Inversión inmobiliaria',
  description: 'Plataforma de fondeo para proyectos inmobiliarios en México.',
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-semibold">
        Invierte en bienes raíces con datos y transparencia
      </h1>
      <p className="mt-3 max-w-2xl opacity-80">
        Accede a oportunidades seleccionadas y documentos técnicos. Sin mínimos altos.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/proyectos"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Ver proyectos
        </Link>
        <Link
          href="/contacto"
          className="rounded-md border px-4 py-2"
        >
          Hablemos
        </Link>
      </div>
    </main>
  )
}
