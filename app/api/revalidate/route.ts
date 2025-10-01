// app/api/revalidate/route.ts
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const TOKEN = process.env.REVALIDATE_TOKEN

export async function POST(req: Request) {
  try {
    if (!TOKEN) {
      return NextResponse.json(
        { ok: false, error: 'Missing REVALIDATE_TOKEN' },
        { status: 500 }
      )
    }

    const url = new URL(req.url)
    const token = url.searchParams.get('token')
    if (token !== TOKEN) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Intentamos leer el payload (Sanity puede mandar varios formatos)
    const body = await req.json().catch(() => ({} as any))

    // Tomamos slug si viene proyectado en el webhook (recomendado)
    const slug: string | undefined =
      body?.slug ||
      body?.document?.slug?.current ||
      body?.after?.slug?.current ||
      body?.ids?.slug // por si lo mapeas así

    // Revalidamos el listado siempre
    revalidatePath('/proyectos')

    // Si tenemos slug, revalidamos también el detalle
    if (slug) {
      revalidatePath(`/proyectos/${slug}`)
    }

    return NextResponse.json({
      ok: true,
      revalidated: ['/proyectos', slug ? `/proyectos/${slug}` : null].filter(Boolean),
    })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || 'Revalidate error' },
      { status: 500 }
    )
  }
}
