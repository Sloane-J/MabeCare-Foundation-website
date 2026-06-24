import type { APIRoute } from 'astro'
import { z } from 'zod'
import { json, error, unauthorized, serverError } from '../../../lib/api/response'
import { requireAuth } from '../../../lib/auth/session'
import { getDonations, createDonation } from '../../../lib/db/queries'

const CashDonationSchema = z.object({
  amount: z.number().positive(),
  donor_name: z.string().optional(),
  donor_email: z.string().email().optional(),
  date: z.string(),
  note: z.string().optional(),
})

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  const url = new URL(request.url)
  const filters = {
    status: url.searchParams.get('status') ?? undefined,
    channel: url.searchParams.get('channel') ?? undefined,
    type: url.searchParams.get('type') ?? undefined,
    from: url.searchParams.get('from') ?? undefined,
    to: url.searchParams.get('to') ?? undefined,
  }

  try {
    const donations = await getDonations(filters)
    return json(donations)
  } catch {
    return serverError()
  }
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  try {
    const body = await request.json()
    const parsed = CashDonationSchema.safeParse(body)

    if (!parsed.success) {
      return error(parsed.error.issues[0].message)
    }

    const data = parsed.data
    const id = crypto.randomUUID()

    await createDonation({
      id,
      type: 'cash',
      amount: data.amount,
      donor_name: data.donor_name,
      donor_email: data.donor_email,
      date: data.date,
      note: data.note,
    })

    return json({ success: true, id }, 201)
  } catch {
    return serverError()
  }
}
