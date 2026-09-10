import type { APIRoute } from 'astro'
import { z } from 'zod'
import { json, error, serverError } from '../../../lib/api/response'
import { getAdminByEmail, createPasswordResetToken } from '../../../lib/db/queries'
import { sendPasswordResetEmail } from '../../../lib/api/email'

const Schema = z.object({
  email: z.string().email(),
})

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const parsed = Schema.safeParse(body)

    if (!parsed.success) {
      return error('Valid email is required')
    }

    const admin = await getAdminByEmail(parsed.data.email)

    // Always return success even if admin doesn't exist — prevents email enumeration
    if (!admin) {
      return json({ success: true })
    }

    const token = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour

    await createPasswordResetToken({
      admin_id: admin.id as string,
      token,
      expires_at: expiresAt,
    })

    const resetUrl = `${import.meta.env.SITE_URL}/admin/reset-password?token=${token}`

    sendPasswordResetEmail({
      to: admin.email as string,
      resetUrl,
    }).catch(err => console.error('Password reset email failed:', err))

    return json({ success: true })
  } catch {
    return serverError()
  }
}