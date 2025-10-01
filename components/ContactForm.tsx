'use client'
import { useRef, useState } from 'react'

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setMsg(null); setErr(null)

    const form = formRef.current
    if (!form) return

    const f = new FormData(form)
    const payload = {
      name: f.get('name'),
      email: f.get('email'),
      message: f.get('message'),
      company: f.get('company'), // honeypot
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data?.ok) {
        setMsg('¡Mensaje enviado! Te responderemos pronto.')
        setErr(null)
        formRef.current?.reset() // 👈 ahora con ref (no se rompe)
      } else {
        setErr(data?.error || 'No se pudo enviar. Inténtalo más tarde.')
      }
    } catch (e) {
      setErr('Error de red. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-3 rounded-2xl border p-4"
    >
      <input
        name="name"
        placeholder="Nombre"
        className="w-full rounded-md border p-2"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full rounded-md border p-2"
        required
      />
      <textarea
        name="message"
        placeholder="Mensaje"
        className="w-full rounded-md border p-2"
        rows={5}
        required
      />
      {/* Honeypot (oculto para bots) */}
      <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <button
        disabled={loading}
        className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
      >
        {loading ? 'Enviando…' : 'Enviar'}
      </button>

      {msg && <p className="text-green-600">{msg}</p>}
      {err && <p className="text-red-600">{err}</p>}
    </form>
  )
}

