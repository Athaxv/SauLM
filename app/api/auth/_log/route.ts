// Dev-only logging endpoint to swallow auth client logs and return JSON.
// This avoids 500s from the default handler during development.
export async function POST(req: Request) {
  try {
    // read body to avoid stream issues
    await req.text()
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function GET() {
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}
