// app/api/debug-sanity/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})

export async function GET() {
  try {
    const projects = await client.fetch(`
      *[_type=="project" && defined(slug.current)]{
        "slug": slug.current, title
      } | order(_createdAt desc)
    `)
    return NextResponse.json({
      env: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      },
      count: projects?.length || 0,
      first: projects?.[0] || null,
      list: projects,
    })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 })
  }
}
