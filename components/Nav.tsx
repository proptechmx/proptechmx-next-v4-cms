'use client'
import Link from 'next/link'

export default function Nav() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">ProptechMX</Link>
        <div className="flex gap-6 text-sm">
          <Link href="/proyectos">Proyectos</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
      </nav>
    </header>
  )
}
