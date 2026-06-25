import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(import.meta.env.JWT_SECRET)
const ALGORITHM = 'HS256'
const EXPIRY = '8h'

export type AdminPayload = {
  email: string
  role: 'admin'
}

// ─── Sign a new JWT ───────────────────────────────────────────

export async function signToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(SECRET)
}

// ─── Verify and decode a JWT ──────────────────────────────────

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as AdminPayload
  } catch {
    return null
  }
}
