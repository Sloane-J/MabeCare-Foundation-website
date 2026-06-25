import { useEffect, useState } from 'react'
import { Info, ArrowRight, AlertCircle, Package, TrendingUp, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

type Summary = {
  totals: { count: number; total: number }
  byChannel: { channel: string; count: number; total: number }[]
  byStatus: { status: string; count: number }[]
  inkindByStatus: { status: string; count: number }[]
}

const CHANNEL_LABELS: Record<string, string> = {
  card: 'Card',
  mobile_money: 'Mobile Money',
  bank_transfer: 'Bank Transfer',
  ussd: 'USSD',
  apple_pay: 'Apple Pay',
  qr: 'QR Code',
  cash: 'Cash',
}

// ── Reusable panel ────────────────────────────────────────────────────────────
function Panel({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title?: string
  subtitle?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white', className)}>
      {title && (
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-3.5">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-800">{title}</span>
              <Info className="h-3.5 w-3.5 text-gray-300" />
            </div>
            {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

// ── Top metric (large, prominent) ─────────────────────────────────────────────
function PrimaryMetric({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className={cn('mt-1 text-3xl font-bold tracking-tight', accent ? 'text-violet-600' : 'text-gray-900')}>
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
    </div>
  )
}

// ── Inline metric (smaller, secondary) ────────────────────────────────────────
function SecondaryMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-0.5 text-lg font-semibold text-gray-800">{value}</p>
    </div>
  )
}

// ── Action item row (pending items that need attention) ───────────────────────
function ActionRow({
  label,
  count,
  description,
  href,
  urgent,
}: {
  label: string
  count: number
  description: string
  href: string
  urgent?: boolean
}) {
  return (
    <a
      href={href}
      className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 transition-colors hover:border-violet-200 hover:bg-violet-50 group"
    >
      <div className="flex items-center gap-3">
        <div className={cn('flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
          urgent ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
        )}>
          {count}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-violet-500 transition-colors" />
    </a>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ message, cta, href }: { message: string; cta?: string; href?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-center">
      <AlertCircle className="h-8 w-8 text-gray-200" />
      <p className="text-sm text-gray-400">{message}</p>
      {cta && href && (
        <a href={href} className="text-xs font-medium text-violet-600 hover:underline">
          {cta} →
        </a>
      )}
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="h-7 w-32 rounded bg-gray-100" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="h-36 rounded-xl bg-gray-100 lg:col-span-2" />
        <div className="h-36 rounded-xl bg-gray-100" />
      </div>
      <div className="h-40 rounded-xl bg-gray-100" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="h-40 rounded-xl bg-gray-100" />
        <div className="h-40 rounded-xl bg-gray-100" />
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/reports/summary')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load')
        return r.json()
      })
      .then(setSummary)
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Skeleton />

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </div>
    )
  }

  const total = summary?.totals?.total ?? 0
  const count = summary?.totals?.count ?? 0

  const pending = summary?.byStatus?.find(s => s.status === 'pending')?.count ?? 0
  const confirmed = summary?.byStatus?.find(s => s.status === 'confirmed')?.count ?? 0
  const reconciled = summary?.byStatus?.find(s => s.status === 'reconciled')?.count ?? 0

  const inkindSubmitted = summary?.inkindByStatus?.find(s => s.status === 'submitted')?.count ?? 0
  const inkindInTransit = summary?.inkindByStatus?.find(s => s.status === 'in_transit')?.count ?? 0
  const inkindDelivered = summary?.inkindByStatus?.find(s => s.status === 'delivered')?.count ?? 0

  const totalActionItems = pending + inkindSubmitted
  const maxChannelTotal = Math.max(...(summary?.byChannel?.map(r => Number(r.total)) ?? [1]), 1)

  return (
    <div className="space-y-5 pb-10">

      {/* ── Page header ───────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-0.5 text-sm text-gray-400">
            {totalActionItems > 0
              ? `${totalActionItems} item${totalActionItems !== 1 ? 's' : ''} need your attention`
              : 'Everything is up to date'}
          </p>
        </div>
        <a
          href="/admin/reports"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-violet-300 hover:text-violet-700"
        >
          <Download className="h-3.5 w-3.5" />
          Export report
        </a>
      </div>

      {/* ── Row 1: Totals + needs-action ──────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Financial summary */}
        <Panel
          title="Donation summary"
          subtitle="All confirmed and pending donations"
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <PrimaryMetric
              label="Total raised"
              value={`₵${total.toLocaleString('en-GH', { minimumFractionDigits: 2 })}`}
              sub={`across ${count} donation${count !== 1 ? 's' : ''}`}
              accent
            />
            <SecondaryMetric
              label="Pending confirmation"
              value={pending}
            />
            <SecondaryMetric
              label="Confirmed"
              value={confirmed}
            />
            <SecondaryMetric
              label="Reconciled"
              value={reconciled}
            />
          </div>
        </Panel>

        {/* In-kind summary */}
        <Panel
          title="In-kind summary"
          subtitle="Physical item donations"
        >
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-4">
            <SecondaryMetric label="Awaiting dispatch" value={inkindSubmitted} />
            <SecondaryMetric label="In transit" value={inkindInTransit} />
            <SecondaryMetric label="Delivered" value={inkindDelivered} />
          </div>
        </Panel>

      </div>

      {/* ── Row 2: Action items ────────────────────────── */}
      <Panel
        title="Needs your attention"
        subtitle="Items that require a review or status update"
      >
        {totalActionItems === 0 ? (
          <EmptyState
            message="Nothing to action right now. All donations are reviewed and in-kind items are dispatched."
          />
        ) : (
          <div className="space-y-2">
            {pending > 0 && (
              <ActionRow
                label={`${pending} donation${pending !== 1 ? 's' : ''} pending confirmation`}
                count={pending}
                description="Review payment and mark as confirmed or flag for follow-up"
                href="/admin/donations?status=pending"
                urgent
              />
            )}
            {inkindSubmitted > 0 && (
              <ActionRow
                label={`${inkindSubmitted} in-kind submission${inkindSubmitted !== 1 ? 's' : ''} awaiting dispatch`}
                count={inkindSubmitted}
                description="Contact donor and update status to in transit once collected"
                href="/admin/inkind?status=submitted"
              />
            )}
            {inkindInTransit > 0 && (
              <ActionRow
                label={`${inkindInTransit} item${inkindInTransit !== 1 ? 's' : ''} currently in transit`}
                count={inkindInTransit}
                description="Mark as delivered once items have been received"
                href="/admin/inkind?status=in_transit"
              />
            )}
          </div>
        )}
      </Panel>

      {/* ── Row 3: Channel breakdown + in-kind pipeline ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* By channel */}
        <Panel
          title="Donations by channel"
          subtitle="How donors are sending money"
        >
          {!summary?.byChannel?.length ? (
            <EmptyState
              message="No donations recorded yet."
              cta="View donation settings"
              href="/admin/donations"
            />
          ) : (
            <div className="space-y-4">
              {summary.byChannel.map(row => {
                const pct = Math.round((Number(row.total) / maxChannelTotal) * 100)
                return (
                  <div key={row.channel}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">
                        {CHANNEL_LABELS[row.channel] ?? row.channel}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{row.count} donation{row.count !== 1 ? 's' : ''}</span>
                        <span className="text-xs font-semibold text-gray-900">
                          ₵{Number(row.total).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-100">
                      <div
                        className="h-1.5 rounded-full bg-violet-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Panel>

        {/* In-kind pipeline */}
        <Panel
          title="In-kind pipeline"
          subtitle="Status of all physical item donations"
          action={
            <a href="/admin/inkind" className="text-xs font-medium text-violet-600 hover:underline">
              Manage →
            </a>
          }
        >
          {!summary?.inkindByStatus?.length ? (
            <EmptyState
              message="No in-kind submissions yet."
              cta="Learn how in-kind donations work"
              href="/admin/inkind"
            />
          ) : (
            <div className="space-y-2">
              {[
                { key: 'submitted', label: 'Submitted', description: 'Donor has submitted, awaiting collection', color: 'bg-blue-100 text-blue-700' },
                { key: 'in_transit', label: 'In transit', description: 'Items collected and on the way', color: 'bg-orange-100 text-orange-700' },
                { key: 'delivered', label: 'Delivered', description: 'Items received by MabeCare', color: 'bg-green-100 text-green-700' },
                { key: 'cancelled', label: 'Cancelled', description: 'Submission was cancelled', color: 'bg-gray-100 text-gray-500' },
              ].map(({ key, label, description, color }) => {
                const row = summary?.inkindByStatus?.find(s => s.status === key)
                if (!row) return null
                return (
                  <div key={key} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className={cn('rounded-md px-2 py-0.5 text-xs font-medium', color)}>
                        {label}
                      </span>
                      <span className="text-xs text-gray-400">{description}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">{row.count}</span>
                  </div>
                )
              })}
            </div>
          )}
        </Panel>

      </div>
    </div>
  )
}
