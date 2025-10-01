import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// ⚙️ Cliente Sanity minimal y autosuficiente para este endpoint
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})

// 🔎 GROQ locales (footer + docs legales)
const siteSettingsQuery = `*[_type == "siteSettings"][0]{ email, phone, city, address }`
const legalDocsQuery = `*[_type == "legalDoc"]|order(_updatedAt desc){ title, url }`

export async function GET() {
  try {
    const [settings, legal] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(legalDocsQuery),
    ])

    return NextResponse.json({ ok: true, settings, legal })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || 'Error' },
      { status: 500 }
    )
  }
}
