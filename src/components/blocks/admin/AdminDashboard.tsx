import { useEffect, useState } from 'react'
import {
  Info, ArrowRight, AlertCircle, Package,
  TrendingUp, Download, Banknote, Wallet,
  CheckCircle2, Clock, RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts'

// ─── Types ────────────────────────────────────────────────────────────────────

type Summary = {
  totals: { count: number; total: number }
  byChannel: { channel: string; count: number; total: number }[]
  byStatus: { status: string; count: number }[]
  inkindByStatus: { status: string; count: number }[]
  byType: { type: string; count: number; total: number }[]
  cashTotal: { count: number; total: number }
  paystackTotal: { count: number; total: number }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CHANNEL_LABELS: Record<string, string> = {
  card: 'Card', mobile_money: 'Mobile Money',
  bank_transfer: 'Bank Transfer', ussd: 'USSD',
  apple_pay: 'Apple Pay', qr: 'QR Code',
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#F59E0B', confirmed: '#6A1B9A', reconciled: '#10B981',
}

const INKIND_COLORS: Record<string, string> = {
  submitted: '#3B82F6', in_transit: '#F59E0B', received: '#10B981',
}

const TYPE_COLORS = {
  paystack: '#6A1B9A', cash: '#F59E0B', inkind: '#10B981',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(v: number) {
  return `₵${Number(v).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`
}
function fmtShort(v: number) {
  if (v >= 1000) return `₵${(v / 1000).toFixed(1)}k`
  return `₵${v.toFixed(0)}`
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function Panel({
  title, subtitle, action, children, className,
}: {
  title?: string; subtitle?: string; action?: React.ReactNode
  children: React.ReactNode; className?: string
}) {
  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white', className)}>
      {title && (
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-3.5">
          <div>
            <span className="text-sm font-semibold text-gray-800">{title}</span>
            {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function StatCard({
  label, value, sub, color, icon: Icon,
}: {
  label: string; value: string; sub?: string
  color: string; icon: React.ElementType
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${color}18` }}>
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  )
}

function MiniBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{value}</span>
          <span className="text-xs font-semibold text-gray-900">{pct}%</span>
        </div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

function ActionRow({
  label, count, description, href, urgent,
}: {
  label: string; count: number; description: string; href: string; urgent?: boolean
}) {
  return (
    <a href={href} className="group flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 transition-colors hover:border-violet-200 hover:bg-violet-50">
      <div className="flex items-center gap-3">
        <div className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
          urgent ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
        )}>
          {count}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-violet-500" />
    </a>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-center">
      <AlertCircle className="h-7 w-7 text-gray-200" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  )
}

function Skeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="h-7 w-40 rounded bg-gray-100" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-28 rounded-xl bg-gray-100" />)}
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="h-40 rounded-xl bg-gray-100 lg:col-span-2" />
        <div className="h-40 rounded-xl bg-gray-100" />
      </div>
      <div className="h-36 rounded-xl bg-gray-100" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="h-44 rounded-xl bg-gray-100" />
        <div className="h-44 rounded-xl bg-gray-100" />
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  async function fetchSummary() {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch('/api/reports/summary')
      if (!r.ok) throw new Error('Failed to load')
      setSummary(await r.json())
    } catch {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSummary() }, [])

  if (loading) return <Skeleton />

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </div>
    )
  }

  // ── Derived values ─────────────────────────────────────────────────────────
  const total         = Number(summary?.totals?.total ?? 0)
  const count         = Number(summary?.totals?.count ?? 0)
  const cashCount     = Number(summary?.cashTotal?.count ?? 0)
  const cashTotal     = Number(summary?.cashTotal?.total ?? 0)
  const paystackCount = Number(summary?.paystackTotal?.count ?? 0)
  const paystackTotal = Number(summary?.paystackTotal?.total ?? 0)

  const pending    = summary?.byStatus?.find(s => s.status === 'pending')?.count    ?? 0
  const confirmed  = summary?.byStatus?.find(s => s.status === 'confirmed')?.count  ?? 0
  const reconciled = summary?.byStatus?.find(s => s.status === 'reconciled')?.count ?? 0
  const statusTotal = pending + confirmed + reconciled

  const inkindSubmitted  = summary?.inkindByStatus?.find(s => s.status === 'submitted')?.count  ?? 0
  const inkindInTransit  = summary?.inkindByStatus?.find(s => s.status === 'in_transit')?.count  ?? 0
  const inkindReceived   = summary?.inkindByStatus?.find(s => s.status === 'received')?.count    ?? 0
  const inkindTotal      = inkindSubmitted + inkindInTransit + inkindReceived

  const totalActionItems = pending + inkindSubmitted + inkindInTransit
  const avg = count > 0 ? total / count : 0

  const maxChannel = Math.max(...(summary?.byChannel?.map(r => Number(r.total)) ?? [1]), 1)

  // Bar chart data — donation type comparison
  const typeBarData = [
    { name: 'Paystack', amount: paystackTotal, count: paystackCount, fill: TYPE_COLORS.paystack },
    { name: 'Cash',     amount: cashTotal,     count: cashCount,     fill: TYPE_COLORS.cash     },
    { name: 'In-Kind',  amount: inkindReceived * 500, count: inkindReceived, fill: TYPE_COLORS.inkind },
  ]

  return (
    <div className="space-y-5 pb-10">

      {/* ── Header ────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#111827', fontFamily: "'Merriweather', serif" }}>
            Dashboard
          </h1>
          <p className="mt-0.5 text-sm text-gray-400">
            {totalActionItems > 0
              ? `${totalActionItems} item${totalActionItems !== 1 ? 's' : ''} need your attention`
              : 'Everything is up to date'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchSummary}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:text-gray-700"
            aria-label="Refresh"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <a
            href="/admin/reports"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-violet-300 hover:text-violet-700"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </a>
        </div>
      </div>

      {/* ── Row 1: Stat cards ─────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total raised"
          value={fmt(total)}
          sub={`${count} donation${count !== 1 ? 's' : ''}`}
          color="#6A1B9A"
          icon={TrendingUp}
        />
        <StatCard
          label="Paystack"
          value={fmt(paystackTotal)}
          sub={`${paystackCount} transaction${paystackCount !== 1 ? 's' : ''}`}
          color="#6A1B9A"
          icon={Wallet}
        />
        <StatCard
          label="Cash"
          value={fmt(cashTotal)}
          sub={`${cashCount} entr${cashCount !== 1 ? 'ies' : 'y'}`}
          color="#F59E0B"
          icon={Banknote}
        />
        <StatCard
          label="In-Kind"
          value={`${inkindTotal} item${inkindTotal !== 1 ? 's' : ''}`}
          sub={`${inkindReceived} received`}
          color="#10B981"
          icon={Package}
        />
      </div>

      {/* ── Row 2: Summary + reconciliation ───────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Financial summary */}
        <Panel
          title="Financial summary"
          subtitle="Paystack + cash donations"
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Average</p>
              <p className="mt-1 text-2xl font-bold text-violet-600">{fmt(avg)}</p>
              <p className="mt-0.5 text-xs text-gray-400">per donation</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Pending</p>
              <p className="mt-1 text-2xl font-bold text-yellow-500">{pending}</p>
              <p className="mt-0.5 text-xs text-gray-400">need review</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Confirmed</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{confirmed}</p>
              <p className="mt-0.5 text-xs text-gray-400">verified</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Reconciled</p>
              <p className="mt-1 text-2xl font-bold text-green-600">{reconciled}</p>
              <p className="mt-0.5 text-xs text-gray-400">closed</p>
            </div>
          </div>

          {/* Reconciliation mini bars */}
          {statusTotal > 0 && (
            <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
              <MiniBar label="Pending"    value={pending}    total={statusTotal} color={STATUS_COLORS.pending}    />
              <MiniBar label="Confirmed"  value={confirmed}  total={statusTotal} color={STATUS_COLORS.confirmed}  />
              <MiniBar label="Reconciled" value={reconciled} total={statusTotal} color={STATUS_COLORS.reconciled} />
            </div>
          )}
        </Panel>

        {/* In-kind pipeline */}
        <Panel title="In-kind pipeline" subtitle="Physical item donations">
          <div className="space-y-3">
            {[
              { key: 'submitted',  label: 'Submitted',  count: inkindSubmitted, color: INKIND_COLORS.submitted  },
              { key: 'in_transit', label: 'In Transit',  count: inkindInTransit, color: INKIND_COLORS.in_transit },
              { key: 'received',   label: 'Received',    count: inkindReceived,  color: INKIND_COLORS.received   },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs font-medium text-gray-700">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.count}</span>
              </div>
            ))}
            {inkindTotal > 0 && (
              <div className="mt-1 border-t border-gray-100 pt-3">
                <MiniBar label="Received rate" value={inkindReceived} total={inkindTotal} color={INKIND_COLORS.received} />
              </div>
            )}
          </div>
          <a href="/admin/inkind" className="mt-4 flex items-center gap-1 text-xs font-medium text-violet-600 hover:underline">
            Manage in-kind <ArrowRight className="h-3 w-3" />
          </a>
        </Panel>
      </div>

      {/* ── Row 3: Action items ────────────────────────── */}
      {totalActionItems > 0 && (
        <Panel title="Needs attention" subtitle="Items requiring a review or status update">
          <div className="space-y-2">
            {pending > 0 && (
              <ActionRow
                label={`${pending} donation${pending !== 1 ? 's' : ''} pending confirmation`}
                count={pending}
                description="Review and confirm or flag for follow-up"
                href="/admin/donations?status=pending"
                urgent
              />
            )}
            {inkindSubmitted > 0 && (
              <ActionRow
                label={`${inkindSubmitted} in-kind submission${inkindSubmitted !== 1 ? 's' : ''} awaiting dispatch`}
                count={inkindSubmitted}
                description="Contact donor and update to in transit"
                href="/admin/inkind?status=submitted"
              />
            )}
            {inkindInTransit > 0 && (
              <ActionRow
                label={`${inkindInTransit} shipment${inkindInTransit !== 1 ? 's' : ''} in transit`}
                count={inkindInTransit}
                description="Mark as received once items arrive"
                href="/admin/inkind?status=in_transit"
              />
            )}
          </div>
        </Panel>
      )}

      {/* ── Row 4: Channel breakdown + type bar chart ──── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Paystack channels */}
        <Panel title="Paystack channels" subtitle="Breakdown of online payment methods">
          {!summary?.byChannel?.length ? (
            <EmptyState message="No Paystack donations recorded yet." />
          ) : (
            <div className="space-y-4">
              {summary.byChannel.map(row => (
                <div key={row.channel}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">
                      {CHANNEL_LABELS[row.channel] ?? row.channel}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{row.count} txn{row.count !== 1 ? 's' : ''}</span>
                      <span className="text-xs font-semibold text-gray-900">
                        {fmt(Number(row.total))}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.round((Number(row.total) / maxChannel) * 100)}%`,
                        background: '#6A1B9A',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>

        {/* Donation type bar chart */}
        <Panel title="By donation type" subtitle="Paystack vs cash vs in-kind">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={typeBarData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#F9F9FA" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} tickFormatter={fmtShort} width={40} />
              <Tooltip
                contentStyle={{ border: '1px solid #EAEAEA', borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => [fmt(v), 'Amount']}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {typeBarData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* Type pills */}
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
            {typeBarData.map(t => (
              <div key={t.name} className="text-center">
                <div className="mx-auto mb-1 h-2 w-2 rounded-full" style={{ background: t.fill }} />
                <p className="text-xs text-gray-400">{t.name}</p>
                <p className="text-sm font-bold text-gray-900">{fmtShort(t.amount)}</p>
                <p className="text-xs text-gray-400">{t.count} entr{t.count !== 1 ? 'ies' : 'y'}</p>
              </div>
            ))}
          </div>
        </Panel>

      </div>

    </div>
  )
}
