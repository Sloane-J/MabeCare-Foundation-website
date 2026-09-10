import { db } from './client'

// ─── Donations ───────────────────────────────────────────────

export async function getDonations(filters?: {
  status?: string
  channel?: string
  type?: string
  from?: string
  to?: string
}) {
  let query = 'SELECT * FROM donations WHERE 1=1'
  const args: (string | number | null)[] = []

  if (filters?.status) {
    query += ' AND status = ?'
    args.push(filters.status)
  }
  if (filters?.channel) {
    query += ' AND channel = ?'
    args.push(filters.channel)
  }
  if (filters?.type) {
    query += ' AND type = ?'
    args.push(filters.type)
  }
  if (filters?.from) {
    query += ' AND date >= ?'
    args.push(filters.from)
  }
  if (filters?.to) {
    query += ' AND date <= ?'
    args.push(filters.to)
  }

  query += ' ORDER BY created_at DESC'

  const result = await db.execute({ sql: query, args })
  return result.rows.map((row: any) => ({ ...row }))
}

export async function getDonationById(id: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM donations WHERE id = ?',
    args: [id],
  })
  return result.rows[0] ? { ...result.rows[0] } : null
}

export async function createDonation(data: {
  id: string
  type: 'paystack' | 'cash'
  channel?: string
  amount: number
  currency?: string
  donor_name?: string
  donor_email?: string
  donor_phone?: string
  date: string
  reference?: string
  note?: string
}) {
  await db.execute({
    sql: `INSERT INTO donations (id, type, channel, amount, currency, donor_name, donor_email, donor_phone, date, reference, note)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.id,
      data.type,
      data.channel ?? null,
      data.amount,
      data.currency ?? 'GHS',
      data.donor_name ?? null,
      data.donor_email ?? null,
      data.donor_phone ?? null,
      data.date,
      data.reference ?? null,
      data.note ?? null,
    ],
  })
}

export async function updateDonation(
  id: string,
  data: { status?: string; note?: string }
) {
  const fields: string[] = []
  const args: (string | number | null)[] = []

  if (data.status) {
    fields.push('status = ?')
    args.push(data.status)
  }
  if (data.note !== undefined) {
    fields.push('note = ?')
    args.push(data.note)
  }

  if (fields.length === 0) return

  args.push(id)

  await db.execute({
    sql: `UPDATE donations SET ${fields.join(', ')} WHERE id = ?`,
    args,
  })
}

// ─── In-Kind Submissions ─────────────────────────────────────

export async function getInkindSubmissions(filters?: { status?: string }) {
  let query = 'SELECT * FROM inkind_submissions WHERE 1=1'
  const args: (string | number | null)[] = []

  if (filters?.status) {
    query += ' AND status = ?'
    args.push(filters.status)
  }

  query += ' ORDER BY created_at DESC'

  const result = await db.execute({ sql: query, args })
  return result.rows.map((row: any) => ({ ...row }))
}

export async function getInkindById(id: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM inkind_submissions WHERE id = ?',
    args: [id],
  })
  return result.rows[0] ? { ...result.rows[0] } : null
}

export async function createInkind(data: {
  id: string
  donor_name: string
  donor_email: string
  country?: string
  item_description: string
  estimated_value?: number
  photos?: string[]
  message?: string
  expected_ship_date?: string
}) {
  await db.execute({
    sql: `INSERT INTO inkind_submissions (id, donor_name, donor_email, country, item_description, estimated_value, photos, message, expected_ship_date)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.id,
      data.donor_name,
      data.donor_email,
      data.country ?? null,
      data.item_description,
      data.estimated_value ?? null,
      JSON.stringify(data.photos ?? []),
      data.message ?? null,
      data.expected_ship_date ?? null,
    ],
  })
}

export async function updateInkind(
  id: string,
  data: { status?: string; admin_note?: string; received_at?: string }
) {
  const fields: string[] = []
  const args: (string | number | null)[] = []

  if (data.status) {
    fields.push('status = ?')
    args.push(data.status)
  }
  if (data.admin_note !== undefined) {
    fields.push('admin_note = ?')
    args.push(data.admin_note)
  }
  if (data.received_at) {
    fields.push('received_at = ?')
    args.push(data.received_at)
  }

  if (fields.length === 0) return

  args.push(id)

  await db.execute({
    sql: `UPDATE inkind_submissions SET ${fields.join(', ')} WHERE id = ?`,
    args,
  })
}

// ─── Reports ─────────────────────────────────────────────────

export async function getReportSummary(from?: string, to?: string) {
  let dateFilter = ''
  const dateArgs: any[] = []

  if (from) {
    dateFilter += ' AND date >= ?'
    dateArgs.push(from)
  }
  if (to) {
    dateFilter += ' AND date <= ?'
    dateArgs.push(to)
  }

  const totals = await db.execute({
    sql: `SELECT COUNT(*) as count, SUM(amount) as total FROM donations WHERE 1=1${dateFilter}`,
    args: dateArgs,
  })

  const byChannel = await db.execute({
    sql: `SELECT channel, COUNT(*) as count, SUM(amount) as total FROM donations WHERE 1=1${dateFilter} GROUP BY channel`,
    args: dateArgs,
  })

  const byStatus = await db.execute({
    sql: `SELECT status, COUNT(*) as count FROM donations WHERE 1=1${dateFilter} GROUP BY status`,
    args: dateArgs,
  })

  const inkindByStatus = await db.execute({
    sql: `SELECT status, COUNT(*) as count FROM inkind_submissions GROUP BY status`,
    args: [],
  })

  const byType = await db.execute({
  sql: `SELECT type, COUNT(*) as count, SUM(amount) as total FROM donations WHERE 1=1${dateFilter} GROUP BY type`,
  args: dateArgs,
})

const cashTotal = await db.execute({
  sql: `SELECT COUNT(*) as count, SUM(amount) as total FROM donations WHERE type = 'cash'${dateFilter}`,
  args: dateArgs,
})

const paystackTotal = await db.execute({
  sql: `SELECT COUNT(*) as count, SUM(amount) as total FROM donations WHERE type = 'paystack'${dateFilter}`,
  args: dateArgs,
})

  return {
  totals: totals.rows[0],
  byChannel: byChannel.rows,
  byStatus: byStatus.rows,
  inkindByStatus: inkindByStatus.rows,
  byType: byType.rows,
  cashTotal: cashTotal.rows[0],
  paystackTotal: paystackTotal.rows[0],
}
}

// ─── Admin Users ─────────────────────────────────────────────

export async function getAdminByEmail(email: string) {
  const result = await getDb().execute({
    sql: 'SELECT * FROM admin_users WHERE email = ?',
    args: [email],
  })
  return result.rows[0] ?? null
}

export async function getAdminById(id: string) {
  const result = await getDb().execute({
    sql: 'SELECT * FROM admin_users WHERE id = ?',
    args: [id],
  })
  return result.rows[0] ?? null
}

export async function updateAdminPassword(id: string, passwordHash: string) {
  await getDb().execute({
    sql: `UPDATE admin_users SET password_hash = :password_hash, updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now') WHERE id = :id`,
    args: { id, password_hash: passwordHash },
  })
}

export async function updateAdminEmail(id: string, email: string) {
  await getDb().execute({
    sql: `UPDATE admin_users SET email = :email, updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now') WHERE id = :id`,
    args: { id, email },
  })
}

// ─── Activity Logs ───────────────────────────────────────────

export async function logActivity(data: {
  admin_email: string
  action: string
  details?: string
  ip_address?: string
}) {
  try {
    await getDb().execute({
      sql: `INSERT INTO activity_logs (id, admin_email, action, details, ip_address)
            VALUES (:id, :admin_email, :action, :details, :ip_address)`,
      args: {
        id: crypto.randomUUID(),
        admin_email: data.admin_email,
        action: data.action,
        details: data.details ?? null,
        ip_address: data.ip_address ?? null,
      },
    })
  } catch (err) {
    // Never let logging failure break the actual operation
    console.error('Failed to log activity:', err)
  }
}

export async function getActivityLogs(page: number = 1, pageSize: number = 20) {
  // Auto-cleanup: delete logs older than 90 days
  await getDb().execute({
    sql: `DELETE FROM activity_logs WHERE created_at < datetime('now', '-90 days')`,
    args: {},
  })

  const offset = (page - 1) * pageSize

  const [rows, countResult] = await Promise.all([
    getDb().execute({
      sql: `SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT :limit OFFSET :offset`,
      args: { limit: pageSize, offset },
    }),
    getDb().execute({
      sql: `SELECT COUNT(*) as count FROM activity_logs`,
      args: {},
    }),
  ])

  return {
    logs: rows.rows,
    total: Number(countResult.rows[0]?.count ?? 0),
    page,
    pageSize,
  }
}

// ─── Password Reset Tokens ───────────────────────────────────

export async function createPasswordResetToken(data: {
  admin_id: string
  token: string
  expires_at: string
}) {
  await getDb().execute({
    sql: `INSERT INTO password_reset_tokens (id, admin_id, token, expires_at)
          VALUES (:id, :admin_id, :token, :expires_at)`,
    args: {
      id: crypto.randomUUID(),
      admin_id: data.admin_id,
      token: data.token,
      expires_at: data.expires_at,
    },
  })
}

export async function getPasswordResetToken(token: string) {
  const result = await getDb().execute({
    sql: 'SELECT * FROM password_reset_tokens WHERE token = ? AND used = 0',
    args: [token],
  })
  return result.rows[0] ?? null
}

export async function markPasswordResetTokenUsed(id: string) {
  await getDb().execute({
    sql: 'UPDATE password_reset_tokens SET used = 1 WHERE id = ?',
    args: [id],
  })
}

// ─── Email Change Tokens ───────────────────────────────────

export async function createEmailChangeToken(data: {
  admin_id: string
  new_email: string
  token: string
  expires_at: string
}) {
  await getDb().execute({
    sql: `INSERT INTO email_change_tokens (id, admin_id, new_email, token, expires_at)
          VALUES (:id, :admin_id, :new_email, :token, :expires_at)`,
    args: {
      id: crypto.randomUUID(),
      admin_id: data.admin_id,
      new_email: data.new_email,
      token: data.token,
      expires_at: data.expires_at,
    },
  })
}

export async function getEmailChangeToken(token: string) {
  const result = await getDb().execute({
    sql: 'SELECT * FROM email_change_tokens WHERE token = ? AND used = 0',
    args: [token],
  })
  return result.rows[0] ?? null
}

export async function markEmailChangeTokenUsed(id: string) {
  await getDb().execute({
    sql: 'UPDATE email_change_tokens SET used = 1 WHERE id = ?',
    args: [id],
  })
}

export async function bulkUpdateDonationStatus(ids: string[], status: string) {
  if (ids.length === 0) return

  const placeholders = ids.map((_, i) => `:id${i}`).join(', ')
  const args: Record<string, string> = { status }
  ids.forEach((id, i) => { args[`id${i}`] = id })

  await getDb().execute({
    sql: `UPDATE donations SET status = :status WHERE id IN (${placeholders})`,
    args,
  })
}