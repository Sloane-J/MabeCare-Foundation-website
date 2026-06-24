import type { APIRoute } from 'astro'
import { signToken } from '../../../lib/auth/jwt'
import { verifyPassword } from '../../../lib/auth/password'
import { COOKIE_NAME, COOKIE_OPTIONS } from '../../../lib/auth/session'

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic input validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check credentials against env
    const adminEmail = import.meta.env.ADMIN_EMAIL
    const adminHash = import.meta.env.ADMIN_PASSWORD_HASH

    if (email !== adminEmail) {
      // Same response as wrong password — don't leak which field is wrong
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const valid = await verifyPassword(password, adminHash)

    if (!valid) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Sign JWT and set httpOnly cookie
    const token = await signToken({ email, role: 'admin' })
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
