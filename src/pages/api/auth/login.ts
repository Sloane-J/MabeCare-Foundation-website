import type { APIRoute } from 'astro'
import { signToken } from '../../../lib/auth/jwt'
import { verifyPassword } from '../../../lib/auth/password'
import { COOKIE_NAME, COOKIE_OPTIONS } from '../../../lib/auth/session'
import { getAdminByEmail } from '../../../lib/db/queries'

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const admin = await getAdminByEmail(email)

    if (!admin) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const valid = await verifyPassword(password, admin.password_hash as string)

    if (!valid) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const token = await signToken({ email: admin.email as string, role: 'admin' })
    cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS)

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}