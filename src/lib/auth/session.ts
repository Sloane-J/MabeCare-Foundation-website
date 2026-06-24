import type { AstroCookies } from 'astro'
import { verifyToken, type AdminPayload } from './jwt'

export const COOKIE_NAME = 'admin_session'

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 8, // 8 hours
}

// ─── Get session from cookies ─────────────────────────────────

export async function getSession(
  cookies: AstroCookies
): Promise<AdminPayload | null> {
  const token = cookies.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

// ─── Guard — redirect if not authenticated ────────────────────

export async function requireAuth(
  cookies: AstroCookies
): Promise<AdminPayload> {
  const session = await getSession(cookies)
  if (!session) {
    throw new Response(null, {
      status: 302,
      headers: { Location: '/admin' },
    })
  }
  return session
}
