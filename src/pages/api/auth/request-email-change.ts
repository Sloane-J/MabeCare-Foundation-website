import type { APIRoute } from 'astro'
import { z } from 'zod'
import { sendEmailChangeConfirmation } from '../../../lib/api/email'
import { error, json, serverError, unauthorized } from '../../../lib/api/response'
import { verifyPassword } from '../../../lib/auth/password'
import { requireAuth } from '../../../lib/auth/session'
import { createEmailChangeToken, getAdminByEmail } from '../../../lib/db/queries'

const Schema = z.object({
  new_email: z.string().email(),
  current_password: z.string().min(1),
})

export const POST: APIRoute = async ({ request, cookies }) => {
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

    const admin = await getAdminByEmail(session.email)
    if (!admin) return error('Account not found', 404)

    const valid = await verifyPassword(parsed.data.current_password, admin.password_hash as string)
    if (!valid) return error('Current password is incorrect', 401)

    const existingWithEmail = await getAdminByEmail(parsed.data.new_email)
    if (existingWithEmail) return error('This email is already in use', 400)

    const token = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString()

    await createEmailChangeToken({
      admin_id: admin.id as string,
      new_email: parsed.data.new_email,
      token,
      expires_at: expiresAt,
    })

    const confirmUrl = `${import.meta.env.SITE_URL}/api/auth/confirm-email-change?token=${token}`

    sendEmailChangeConfirmation({
      to: parsed.data.new_email,
      confirmUrl,
    }).catch(err => console.error('Email change confirmation failed:', err))

    return json({ success: true })
  } catch {
    return serverError()
  }
}