// Password hashing using Web Crypto API (edge-compatible, no bcrypt needed)
// Uses PBKDF2 — secure, no external dependency

const ITERATIONS = 100_000
const KEY_LENGTH = 64
const ALGORITHM = 'SHA-512'

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: ALGORITHM,
    },
    keyMaterial,
    KEY_LENGTH * 8
  )

  return `${toHex(salt.buffer)}:${toHex(hashBuffer)}`
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const encoder = new TextEncoder()
  const [saltHex, hashHex] = stored.split(':')

  const salt = new Uint8Array(
    saltHex.match(/.{2}/g)!.map(b => parseInt(b, 16))
  )

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: ALGORITHM,
    },
    keyMaterial,
    KEY_LENGTH * 8
  )

  const attemptHex = toHex(hashBuffer)

  // Timing-safe comparison
  if (attemptHex.length !== hashHex.length) return false
  let diff = 0
  for (let i = 0; i < attemptHex.length; i++) {
    diff |= attemptHex.charCodeAt(i) ^ hashHex.charCodeAt(i)
  }
  return diff === 0
}
