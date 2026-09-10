import { createClient, type Client } from '@libsql/client'

let _db: Client | null = null

export function getDb(): Client {
  if (_db) return _db

  const url = import.meta.env.TURSO_DATABASE_URL
  const authToken = import.meta.env.TURSO_AUTH_TOKEN

  if (!url || url === 'placeholder') {
    throw new Error('TURSO_DATABASE_URL is not configured')
  }
  if (!authToken || authToken === 'placeholder') {
    throw new Error('TURSO_AUTH_TOKEN is not configured')
  }

  _db = createClient({ url, authToken })
  return _db
}