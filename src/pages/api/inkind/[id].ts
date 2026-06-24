import type { APIRoute } from 'astro'
import { z } from 'zod'
import { json, error, unauthorized, notFound, serverError } from '../../../lib/api/response'
import { requireAuth } from '../../../lib/auth/session'
import { getInkindById, updateInkind } from '../../../lib/db/queries'
import { sendInkindConfirmation } from '../../../lib/api/email'

const UpdateSchema = z.object({
  status: z.enum(['submitted', 'in_transit', 'received']).optional(),
  admin_note: z.string().optional(),
})

export const GET: APIRoute = async ({ params, cookies }) => {
  try {
    await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  const { id } = params
  if (!id) return error('Missing id')

  try {
    const submission = await getInkindById(id)
    if (!submission) return notFound()
    return json(submission)
  } catch {
    return serverError()
  }
}

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  try {
    await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  const { id } = params
  if (!id) return error('Missing id')

  try {
    const existing = await getInkindById(id)
    if (!existing) return notFound()

    const body = await request.json()
    const parsed = UpdateSchema.safeParse(body)

    if (!parsed.success) {
      return error(parsed.error.issues[0].message)
    }

    const updateData: Parameters<typeof updateInkind>[1] = {
      ...parsed.data,
    }

    // If marking as received, record timestamp and send confirmation email
    if (parsed.data.status === 'received' && existing.status !== 'received') {
      updateData.received_at = new Date().toISOString()

      // Fire confirmation email — non-blocking, don't fail the request if email fails
      sendInkindConfirmation({
        donor_name: existing.donor_name as string,
        donor_email: existing.donor_email as string,
        item_description: existing.item_description as string,
        received_at: updateData.received_at,
      }).catch(err => console.error('Email send failed:', err))
    }

    await updateInkind(id, updateData)
    return json({ success: true })
  } catch {
    return serverError()
  }
}
