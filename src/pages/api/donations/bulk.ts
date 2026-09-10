import type { APIRoute } from 'astro'
import { z } from 'zod'
import { json, error, unauthorized, serverError } from '../../../lib/api/response'
import { requireAuth } from '../../../lib/auth/session'
import { bulkUpdateDonationStatus, logActivity } from '../../../lib/db/queries'

const Schema = z.object({
  ids: z.array(z.string()).min(1, 'Select at least one donation'),
  status: z.enum(['pending', 'confirmed', 'reconciled']),
})

export const PATCH: APIRoute = async ({ request, cookies }) => {
  let session
  try {
    session = await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  try {
    const body = await request.json()
    const parsed = Schema.safeParse(body)

    if (!parsed.success) {
      return error(parsed.error.issues[0].message)
    }

    await bulkUpdateDonationStatus(parsed.data.ids, parsed.data.status)

    logActivity({
      admin_email: session.email,
      action: 'donation_status_update',
      details: `Bulk updated ${parsed.data.ids.length} donation(s) → ${parsed.data.status}`,
    })

    return json({ success: true, updated: parsed.data.ids.length })
  } catch {
    return serverError()
  }
}