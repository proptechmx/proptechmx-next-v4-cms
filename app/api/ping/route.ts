// app/api/ping/route.ts
export function GET() {
  return Response.json({ ok: true, time: new Date().toISOString() })
}
