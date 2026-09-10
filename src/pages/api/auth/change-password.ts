import type { APIRoute } from 'astro'
import { z } from 'zod'
import { json, error, unauthorized, serverError } from '../../../lib/api/response'
import { hashPassword, verifyPassword } from '../../../lib/auth/password'
import { requireAuth } from '../../../lib/auth/session'
import { getAdminByEmail, logActivity, updateAdminPassword } from '../../../lib/db/queries'

const Schema = z.object({
  current_password: z.string().min(1),
  new_password: z.string().min(8, 'New password must be at least 8 characters'),
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

    const newHash = await hashPassword(parsed.data.new_password)
    await updateAdminPassword(admin.id as string, newHash)

    logActivity({
      admin_email: admin.email as string,
      action: 'password_change',
      details: 'Password changed from profile settings',
    })

    return json({ success: true })
  } catch {
    return serverError()
  }
}