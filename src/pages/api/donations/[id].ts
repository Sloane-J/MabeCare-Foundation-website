import type { APIRoute } from 'astro'
import { z } from 'zod'
import { json, error, unauthorized, notFound, serverError } from '../../../lib/api/response'
import { requireAuth } from '../../../lib/auth/session'
import { getDonationById, updateDonation } from '../../../lib/db/queries'

const UpdateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'reconciled']).optional(),
  note: z.string().optional(),
})

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  try {
    await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  const { id } = params
  if (!id) return error('Missing id')

  try {
    const existing = await getDonationById(id)
    if (!existing) return notFound()

    const body = await request.json()
    const parsed = UpdateSchema.safeParse(body)

    if (!parsed.success) {
      return error(parsed.error.issues[0].message)
    }

    await updateDonation(id, parsed.data)
    return json({ success: true })
  } catch {
    return serverError()
  }
}
