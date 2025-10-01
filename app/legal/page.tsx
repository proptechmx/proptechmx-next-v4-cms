// app/legal/page.tsx
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: true,
})

const query = `
*[_type == "legalDoc"][0]{
  title,
  content
}
`

export const metadata = {
  title: 'Aviso de privacidad · ProptechMX',
  description: 'Términos y aviso de privacidad.',
}

export default async function LegalPage() {
  const data = await client.fetch<{
    title?: string
    content?: any
  }>(query)

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose">
      <h1>{data?.title || 'Aviso de privacidad'}</h1>
      {data?.content ? (
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {typeof data.content === 'string'
            ? data.content
            : JSON.stringify(data.content, null, 2)}
        </pre>
      ) : (
        <p>Pronto publicaremos nuestro aviso de privacidad.</p>
      )}
    </main>
  )
}
