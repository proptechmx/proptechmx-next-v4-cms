export const metadata = {
  title: 'Metodología – PROPTECHMX',
  description: 'Cómo calculamos TIR, ROI y riesgos.'
}

async function getSite() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  const res = await fetch(`${base}/api/site`, { cache: 'no-store' })
  try { return await res.json() } catch { return { ok:false } }
}

export default async function Metodologia() {
  const data = await getSite()
  const legal = data?.legal || []

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 prose prose-zinc">
      <h1>Metodología de cálculo y riesgos</h1>
      <p>Guía resumida de TIR, ROI y escenarios.</p>
      <h2>Documentos legales</h2>
      {legal.length ? (
        <ul>{legal.map((d:any)=>(<li key={d._id}><a className="underline" href={d.url} target="_blank">{d.title}</a>{d.category?` — ${d.category}`:''}</li>))}</ul>
      ) : (<p className="text-sm text-zinc-500">Aún no hay documentos legales en el CMS.</p>)}
    </main>
  )
}
