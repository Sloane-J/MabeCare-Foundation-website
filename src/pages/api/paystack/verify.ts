import type { APIRoute } from 'astro'
import { json, error, serverError } from '../../../lib/api/response'

export const GET: APIRoute = async ({ url }) => {
  const reference = url.searchParams.get('reference')

  if (!reference) {
    return error('Missing reference', 400)
  }

  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.TEST_SECRET_KEY}`,
        },
      }
    )

    const data = await res.json()

    if (!data.status) {
      return error(data.message ?? 'Verification failed', 400)
    }

    return json({
      status: data.data.status,
      amount: data.data.amount / 100,
      currency: data.data.currency,
      reference: data.data.reference,
      paid_at: data.data.paid_at,
      channel: data.data.channel,
      donor_email: data.data.customer?.email,
    })
  } catch {
    return serverError()
  }
}