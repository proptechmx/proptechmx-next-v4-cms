import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production') as string,
  apiVersion: '2024-06-01',
  useCdn: false, // en prod puedes true si no necesitas datos en “vivo”
})

