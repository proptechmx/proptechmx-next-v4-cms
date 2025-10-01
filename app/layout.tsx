// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { createClient } from '@sanity/client'
import Nav from '@/components/Nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Evita caché mientras editamos desde CMS
export const dynamic = 'force-dynamic'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production') as string,
  apiVersion: '2024-06-01',
  useCdn: false,
})

async function getSettings() {
  return client.fetch<{
    email?: string
    phone?: string
    city?: string
    address?: string
  }>(`*[_type=="siteSettings"][0]{email,phone,city,address}`)
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  let settings: Awaited<ReturnType<typeof getSettings>> | null = null
  try {
    settings = await getSettings()
  } catch {
    settings = null
  }

  const email = settings?.email ?? '—'
  const phone = settings?.phone ?? '—'
  const location = settings?.address ?? settings?.city ?? ''

  return (
    <html lang="es">
      <body>
        <Nav />
        {children}
        <footer className="mt-20 border-t p-6 text-sm opacity-80">
          <div className="mx-auto max-w-6xl">
            <div>Contacto: {email} · {phone}</div>
            {location ? <div>{location}</div> : null}
            <div className="mt-1">
              <a href="/legal" className="underline opacity-70">Aviso de privacidad</a>
            </div>
          </div>
        </footer>

        {/* Analytics & Performance */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}


