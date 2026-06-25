import type { APIRoute } from 'astro'
import { json, unauthorized, serverError } from '../../../lib/api/response'
import { requireAuth } from '../../../lib/auth/session'
import { getReportSummary } from '../../../lib/db/queries'

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  const url = new URL(request.url)
  const from = url.searchParams.get('from') ?? undefined
  const to = url.searchParams.get('to') ?? undefined

  try {
    const summary = await getReportSummary(from, to)
    return json(summary)
  } catch {
    return serverError()
  }
}
