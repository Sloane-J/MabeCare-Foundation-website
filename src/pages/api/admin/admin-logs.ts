import type { APIRoute } from 'astro'
import { json, unauthorized, serverError } from '../../../lib/api/response'
import { requireAuth } from '../../../lib/auth/session'
import { getActivityLogs } from '../../../lib/db/queries'

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page') ?? '1')
  const pageSize = Number(url.searchParams.get('pageSize') ?? '20')

  try {
    const result = await getActivityLogs(page, pageSize)
    return json(result)
  } catch {
    return serverError()
  }
}