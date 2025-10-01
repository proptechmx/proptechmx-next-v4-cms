import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim()
    const message = String(body?.message || '').trim()
    const hp = String(body?.company || '').trim() // honeypot

    // corta bots silenciosamente
    if (hp) return NextResponse.json({ ok: true })

    // validaciones básicas
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Faltan campos' },
        { status: 400 },
      )
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
      return NextResponse.json(
        { ok: false, error: 'Falta RESEND_API_KEY o CONTACT_TO' },
        { status: 500 },
      )
    }

    const to = process.env.CONTACT_TO!
    const subject = `Nuevo mensaje de ${name}`
    const text = `Nombre: ${name}\nEmail: ${email}\n\n${message}`

    const out = await resend.emails.send({
      from: 'ProptechMX <onboarding@resend.dev>',
      to,
      subject,
      text,
      // 👇 CAMBIO CLAVE: usar replyTo (no reply_to)
      replyTo: email,
    })

    return NextResponse.json({ ok: true, id: out?.data?.id ?? null })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || 'Error' },
      { status: 500 },
    )
  }
}
