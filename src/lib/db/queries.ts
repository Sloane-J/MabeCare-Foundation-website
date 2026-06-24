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
  const args: Record<string, string> = {}

  if (filters?.status) {
    query += ' AND status = :status'
    args.status = filters.status
  }
  if (filters?.channel) {
    query += ' AND channel = :channel'
    args.channel = filters.channel
  }
  if (filters?.type) {
    query += ' AND type = :type'
    args.type = filters.type
  }
  if (filters?.from) {
    query += ' AND date >= :from'
    args.from = filters.from
  }
  if (filters?.to) {
    query += ' AND date <= :to'
    args.to = filters.to
  }

  query += ' ORDER BY created_at DESC'

  const result = await db.execute({ sql: query, args })
  return result.rows
}

export async function getDonationById(id: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM donations WHERE id = ?',
    args: [id],
  })
  return result.rows[0] ?? null
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
          VALUES (:id, :type, :channel, :amount, :currency, :donor_name, :donor_email, :donor_phone, :date, :reference, :note)`,
    args: {
      id: data.id,
      type: data.type,
      channel: data.channel ?? null,
      amount: data.amount,
      currency: data.currency ?? 'GHS',
      donor_name: data.donor_name ?? null,
      donor_email: data.donor_email ?? null,
      donor_phone: data.donor_phone ?? null,
      date: data.date,
      reference: data.reference ?? null,
      note: data.note ?? null,
    },
  })
}

export async function updateDonation(
  id: string,
  data: { status?: string; note?: string }
) {
  const fields: string[] = []
  const args: Record<string, string> = { id }

  if (data.status) {
    fields.push('status = :status')
    args.status = data.status
  }
  if (data.note !== undefined) {
    fields.push('note = :note')
    args.note = data.note
  }

  if (fields.length === 0) return

  await db.execute({
    sql: `UPDATE donations SET ${fields.join(', ')} WHERE id = :id`,
    args,
  })
}

// ─── In-Kind Submissions ─────────────────────────────────────

export async function getInkindSubmissions(filters?: { status?: string }) {
  let query = 'SELECT * FROM inkind_submissions WHERE 1=1'
  const args: Record<string, string> = {}

  if (filters?.status) {
    query += ' AND status = :status'
    args.status = filters.status
  }

  query += ' ORDER BY created_at DESC'

  const result = await db.execute({ sql: query, args })
  return result.rows
}

export async function getInkindById(id: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM inkind_submissions WHERE id = ?',
    args: [id],
  })
  return result.rows[0] ?? null
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
          VALUES (:id, :donor_name, :donor_email, :country, :item_description, :estimated_value, :photos, :message, :expected_ship_date)`,
    args: {
      id: data.id,
      donor_name: data.donor_name,
      donor_email: data.donor_email,
      country: data.country ?? null,
      item_description: data.item_description,
      estimated_value: data.estimated_value ?? null,
      photos: JSON.stringify(data.photos ?? []),
      message: data.message ?? null,
      expected_ship_date: data.expected_ship_date ?? null,
    },
  })
}

export async function updateInkind(
  id: string,
  data: { status?: string; admin_note?: string; received_at?: string }
) {
  const fields: string[] = []
  const args: Record<string, string> = { id }

  if (data.status) {
    fields.push('status = :status')
    args.status = data.status
  }
  if (data.admin_note !== undefined) {
    fields.push('admin_note = :admin_note')
    args.admin_note = data.admin_note
  }
  if (data.received_at) {
    fields.push('received_at = :received_at')
    args.received_at = data.received_at
  }

  if (fields.length === 0) return

  await db.execute({
    sql: `UPDATE inkind_submissions SET ${fields.join(', ')} WHERE id = :id`,
    args,
  })
}

// ─── Reports ─────────────────────────────────────────────────

export async function getReportSummary(from?: string, to?: string) {
  let dateFilter = ''
  const args: Record<string, string> = {}

  if (from) {
    dateFilter += ' AND date >= :from'
    args.from = from
  }
  if (to) {
    dateFilter += ' AND date <= :to'
    args.to = to
  }

  const [totals, byChannel, byStatus, inkindByStatus] = await Promise.all([
    db.execute({
      sql: `SELECT COUNT(*) as count, SUM(amount) as total FROM donations WHERE 1=1${dateFilter}`,
      args,
    }),
