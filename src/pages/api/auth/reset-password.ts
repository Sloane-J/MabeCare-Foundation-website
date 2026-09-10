import type { APIRoute } from 'astro'
import { z } from 'zod'
import { json, error, serverError } from '../../../lib/api/response'
import { hashPassword } from '../../../lib/auth/password'
import {
  getPasswordResetToken,
  markPasswordResetTokenUsed,
  updateAdminPassword,
  logActivity,
  getAdminById,
} from '../../../lib/db/queries'

const Schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const parsed = Schema.safeParse(body)

    if (!parsed.success) {
      return error(parsed.error.issues[0].message)
    }

    const { token, password } = parsed.data

    const resetToken = await getPasswordResetToken(token)

    if (!resetToken) {
      return error('This reset link is invalid or has already been used', 400)
    }

    if (new Date(resetToken.expires_at as string) < new Date()) {
      return error('This reset link has expired. Please request a new one.', 400)
    }

    const passwordHash = await hashPassword(password)
    await updateAdminPassword(resetToken.admin_id as string, passwordHash)
    await markPasswordResetTokenUsed(resetToken.id as string)

    const admin = await getAdminById(resetToken.admin_id as string)
    if (admin) {
      logActivity({
        admin_email: admin.email as string,
        action: 'password_change',
        details: 'Password reset via email link',
      })
    }

    return json({ success: true })
  } catch {
    return serverError()
  }
}