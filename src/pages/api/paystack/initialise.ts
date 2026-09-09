import type { APIRoute } from 'astro'
import { z } from 'zod'
import { json, error, serverError } from '../../../lib/api/response'

const Schema = z.object({
  amount: z.number().positive(),
  email: z.string().email(),
  name: z.string().optional(),
})

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const parsed = Schema.safeParse(body)

    if (!parsed.success) {
      return error(parsed.error.issues[0].message)
    }

    const { amount, email, name } = parsed.data

    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.TEST_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        email,
        full_name: name,
        currency: 'GHS',
        callback_url: `${import.meta.env.SITE_URL}/donate/success`,
      }),
    })

    const data = await res.json()

    if (!data.status) {
      return error(data.message ?? 'Paystack initialization failed')
    }

    return json({ authorization_url: data.data.authorization_url })
  } catch {
    return serverError()
  }
}