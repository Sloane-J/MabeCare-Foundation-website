import { createClient } from '@libsql/client'

if (!import.meta.env.TURSO_DATABASE_URL) {
  throw new Error('TURSO_DATABASE_URL is not set')
}

if (!import.meta.env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_AUTH_TOKEN is not set')
}

export const db = createClient({
  url: import.meta.env.TURSO_DATABASE_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
})
