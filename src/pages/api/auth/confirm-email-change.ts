import type { APIRoute } from 'astro'
import {
  getEmailChangeToken,
  markEmailChangeTokenUsed,
  updateAdminEmail,
  getAdminById,
  logActivity,
} from '../../../lib/db/queries'

export const GET: APIRoute = async ({ url, redirect }) => {
  const token = url.searchParams.get('token')

  if (!token) {
    return redirect('/admin?email_change=invalid')
  }

  const changeToken = await getEmailChangeToken(token)

  if (!changeToken) {
    return redirect('/admin?email_change=invalid')
  }

  if (new Date(changeToken.expires_at as string) < new Date()) {
    return redirect('/admin?email_change=expired')
  }

  const admin = await getAdminById(changeToken.admin_id as string)
  if (!admin) {
    return redirect('/admin?email_change=invalid')
  }

  await updateAdminEmail(admin.id as string, changeToken.new_email as string)
  await markEmailChangeTokenUsed(changeToken.id as string)

  logActivity({
    admin_email: changeToken.new_email as string,
    action: 'email_change',
    details: `Email changed from ${admin.email} to ${changeToken.new_email}`,
  })

  return redirect('/admin?email_change=success')
}