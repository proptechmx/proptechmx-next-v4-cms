// app/api/health/route.ts
import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    ok: true,
    node: process.version,
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || '×',
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      CONTACT_TO: !!process.env.CONTACT_TO,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || '×',
    },
    tips: [
      'Si algún campo es false o ×, faltan variables en .env.local',
      'Luego de editar .env.local, reinicia: npm run dev',
    ],
  })
}
