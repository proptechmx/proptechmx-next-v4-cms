// app/api/routes/route.ts
import { NextResponse } from 'next/server'

const ROUTES = ['/', '/proyectos', '/contacto', '/legal', '/sitemap.xml', '/robots.txt']

export async function GET() {
  const base = 'http://localhost:3000'
  const results: any[] = []
  for (const r of ROUTES) {
    try {
      const res = await fetch(base + r, { cache: 'no-store' })
      results.push({ route: r, status: res.status })
    } catch (e: any) {
      results.push({ route: r, error: e?.message || 'fetch error' })
    }
  }
  return NextResponse.json({ ok: true, results })
}
