import { MetadataRoute } from 'next'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production') as string,
  apiVersion: '2024-06-01',
  useCdn: true,
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://proptechmx.vercel.app'
  const projects: { slug: string }[] = await client.fetch(`*[_type=="project"]{"slug": slug.current}`)
  const staticRoutes = ['', '/proyectos', '/metodologia'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }))
  const projectRoutes = projects.filter(p => p.slug).map((p) => ({
    url: `${base}/proyectos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  return [...staticRoutes, ...projectRoutes]
}
