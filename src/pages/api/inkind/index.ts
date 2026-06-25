import type { APIRoute } from 'astro'
import { json, unauthorized, serverError } from '../../../lib/api/response'
import { requireAuth } from '../../../lib/auth/session'
import { getInkindSubmissions } from '../../../lib/db/queries'

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  const url = new URL(request.url)
  const status = url.searchParams.get('status') ?? undefined

  try {
    const submissions = await getInkindSubmissions({ status })
    return json(submissions)
  } catch {
    return serverError()
  }
}
