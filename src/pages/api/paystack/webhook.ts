import type { APIRoute } from 'astro'
import { createDonation } from '../../../lib/db/queries'
import { json, error, serverError } from '../../../lib/api/response'
import { sendDonationAlert } from '../../../lib/api/email'

// Verify Paystack HMAC signature
async function verifyPaystackSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  )
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload)
  )
  const computed = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  // Timing-safe comparison
  if (computed.length !== signature.length) return false
  let diff = 0
  for (let i = 0; i < computed.length; i++) {
    diff |= computed.charCodeAt(i) ^ signature.charCodeAt(i)
  }
  return diff === 0
}

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get('x-paystack-signature')
  if (!signature) return error('Missing signature', 401)

  const rawBody = await request.text()

  const valid = await verifyPaystackSignature(
    rawBody,
    signature,
    import.meta.env.PAYSTACK_SECRET_KEY
  )

  if (!valid) return error('Invalid signature', 401)

  try {
    const event = JSON.parse(rawBody)

    // Only process successful charge events
    if (event.event !== 'charge.success') {
      return json({ received: true })
    }

    const data = event.data

    await createDonation({
      id: crypto.randomUUID(),
      type: 'paystack',
      channel: data.channel ?? null,
      amount: data.amount / 100, // Paystack sends amount in pesewas
      currency: data.currency ?? 'GHS',
      donor_name: data.customer?.name ?? null,
      donor_email: data.customer?.email ?? null,
      donor_phone: data.customer?.phone ?? null,
      date: data.paid_at ?? new Date().toISOString(),
      reference: data.reference,
    })

    sendDonationAlert({
  type: 'paystack',
  channel: data.channel,
  amount: data.amount / 100,
  currency: data.currency ?? 'GHS',
  donor_name: data.customer?.name,
  donor_email: data.customer?.email,
  donor_phone: data.customer?.phone,
  reference: data.reference,
  date: data.paid_at ?? new Date().toISOString(),
}).catch(err => console.error('Donation alert failed:', err))

    return json({ received: true })
  } catch {
    return serverError()
  }
}
