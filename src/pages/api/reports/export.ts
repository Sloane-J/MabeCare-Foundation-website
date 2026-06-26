import type { APIRoute } from 'astro'
import { unauthorized, serverError } from '../../../lib/api/response'
import { requireAuth } from '../../../lib/auth/session'
import { getDonations } from '../../../lib/db/queries'

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    await requireAuth(cookies)
  } catch {
    return unauthorized()
  }

  const url = new URL(request.url)
  const filters = {
    status: url.searchParams.get('status') ?? undefined,
    channel: url.searchParams.get('channel') ?? undefined,
    type: url.searchParams.get('type') ?? undefined,
    from: url.searchParams.get('from') ?? undefined,
    to: url.searchParams.get('to') ?? undefined,
  }

  try {
    const donations = await getDonations(filters)

    const headers = [
      'ID', 'Type', 'Channel', 'Amount (GHS)', 'Currency',
      'Donor Name', 'Donor Email', 'Donor Phone',
      'Date', 'Reference', 'Status', 'Note', 'Created At'
    ]

    const rows = donations.map((d: any) => [
  d.id ?? '',
  d.type ?? '',
  d.channel ?? '',
  d.amount ?? '',
  d.currency ?? '',
  d.donor_name ?? '',
  d.donor_email ?? '',
  d.donor_phone ?? '',
  d.date ?? '',
  d.reference ?? '',
  d.status ?? '',
  d.note ?? '',
  d.created_at ?? '',
])

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="donations-export-${Date.now()}.csv"`,
      },
    })
  } catch {
    return serverError()
  }
}
