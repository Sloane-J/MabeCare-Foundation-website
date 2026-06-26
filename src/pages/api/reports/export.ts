import type { APIRoute } from 'astro'
import { unauthorized, serverError } from '../../../lib/api/response'
import { requireAuth } from '../../../lib/auth/session'
import { getDonations, getInkindSubmissions } from '../../../lib/db/queries'

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
    const [donations, inkind] = await Promise.all([
      getDonations(filters),
      getInkindSubmissions(),
    ])

    // ── Donations sheet ───────────────────────────────────
    const donationHeaders = [
      'ID', 'Type', 'Channel', 'Amount (GHS)', 'Currency',
      'Donor Name', 'Donor Email', 'Donor Phone',
      'Date', 'Reference', 'Status', 'Note', 'Created At'
    ]

    const donationRows = donations.map((d: any) => [
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

    // ── In-Kind sheet ─────────────────────────────────────
    const inkindHeaders = [
      'ID', 'Donor Name', 'Donor Email', 'Country',
      'Item Description', 'Estimated Value (GHS)',
      'Expected Ship Date', 'Status', 'Admin Note',
      'Received At', 'Created At'
    ]

    const inkindRows = inkind.map((i: any) => [
      i.id ?? '',
      i.donor_name ?? '',
      i.donor_email ?? '',
      i.country ?? '',
      i.item_description ?? '',
      i.estimated_value ?? '',
      i.expected_ship_date ?? '',
      i.status ?? '',
      i.admin_note ?? '',
      i.received_at ?? '',
      i.created_at ?? '',
    ])

    // ── Combine into one CSV with section labels ──────────
    const toCSV = (headers: string[], rows: any[][]) =>
      [headers, ...rows]
        .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n')

    const csv = [
      '== DONATIONS (Paystack + Cash) ==',
      toCSV(donationHeaders, donationRows),
      '',
      '== IN-KIND DONATIONS ==',
      toCSV(inkindHeaders, inkindRows),
    ].join('\n')

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="mabecare-export-${Date.now()}.csv"`,
      },
    })
  } catch {
    return serverError()
  }
}
