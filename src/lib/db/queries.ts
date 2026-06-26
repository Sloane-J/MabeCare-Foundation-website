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

  return {
    totals: totals.rows[0] ? { ...totals.rows[0] } : { count: 0, total: 0 },
    byChannel: byChannel.rows.map((row: any) => ({ ...row })),
    byStatus: byStatus.rows.map((row: any) => ({ ...row })),
    inkindByStatus: inkindByStatus.rows.map((row: any) => ({ ...row })),
  }
}
