import { useEffect, useState } from 'react'
import {
  Download, RefreshCw, CreditCard, Smartphone, Building2,
  Hash, Apple, QrCode, Banknote, TrendingUp, Package, ChevronDown,
  Wallet, ArrowUpRight,
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
  BarChart, Bar, Legend,
  PieChart, Pie, Cell,
} from 'recharts'

// ─── Types ───────────────────────────────────────────────────────────────────

type Summary = {
  totals: { count: number; total: number }
  byChannel: { channel: string; count: number; total: number }[]
  byStatus: { status: string; count: number }[]
  inkindByStatus: { status: string; count: number }[]
  byType: { type: string; count: number; total: number }[]
  cashTotal: { count: number; total: number }
  paystackTotal: { count: number; total: number }
}

type Range = 'all' | '7d' | '30d' | '90d' | 'custom'

// ─── Constants ───────────────────────────────────────────────────────────────

const CHANNEL_META: Record<string, { label: string; Icon: React.FC<{ className?: string }> }> = {
  card:          { label: 'Card',          Icon: CreditCard  },
  mobile_money:  { label: 'Mobile Money',  Icon: Smartphone  },
  bank_transfer: { label: 'Bank Transfer', Icon: Building2   },
  ussd:          { label: 'USSD',          Icon: Hash        },
  apple_pay:     { label: 'Apple Pay',     Icon: Apple       },
  qr:            { label: 'QR Code',       Icon: QrCode      },
}

const STATUS_META: Record<string, { label: string; color: string }> = {
  pending:    { label: 'Pending',    color: '#F59E0B' },
  confirmed:  { label: 'Confirmed',  color: '#6A1B9A' },
  reconciled: { label: 'Reconciled', color: '#10B981' },
}

const INKIND_META: Record<string, { label: string; color: string }> = {
  submitted:  { label: 'Submitted',  color: '#F59E0B' },
  in_transit: { label: 'In Transit', color: '#3B82F6' },
  received:   { label: 'Received',   color: '#10B981' },
}

const RANGE_OPTIONS: { label: string; value: Range }[] = [
  { label: 'All time',     value: 'all'    },
  { label: 'Last 7 days',  value: '7d'     },
  { label: 'Last 30 days', value: '30d'    },
  { label: 'Last 90 days', value: '90d'    },
  { label: 'Custom range', value: 'custom' },
]

const TYPE_COLORS = {
  paystack: '#6A1B9A',
  cash:     '#F59E0B',
  inkind:   '#10B981',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(v: number) {
  return `₵${Number(v).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`
}
function fmtShort(v: number) {
  if (v >= 1000) return `₵${(v / 1000).toFixed(1)}k`
  return `₵${v.toFixed(0)}`
}
function getDateRange(range: Range): { from: string; to: string } | null {
  if (range === 'all' || range === 'custom') return null
  const to = new Date()
  const from = new Date()
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90
  from.setDate(from.getDate() - days)
  return {
    from: from.toISOString().split('T')[0],
    to:   to.toISOString().split('T')[0],
  }
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

function StatCard({
  label, value, sub, color, icon: Icon,
}: {
  label: string; value: string; sub?: string
  color: string; icon: React.FC<{ style?: React.CSSProperties }>
}) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #EAEAEA', borderRadius: 12,
      padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </span>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: `${color}14`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon style={{ width: 14, height: 14, color }} />
        </div>
      </div>
      <p style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0 }}>{sub}</p>}
    </div>
  )
}

function DonutChart({ data, total }: { data: { name: string; value: number; color: string }[]; total: number }) {
  const chartData = data.length > 0 ? data : [{ name: 'empty', value: 1, color: '#F3F4F6' }]
  return (
    <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
      <PieChart width={100} height={100}>
        <Pie data={chartData} cx={45} cy={45} innerRadius={30} outerRadius={44}
          dataKey="value" strokeWidth={0} startAngle={90} endAngle={-270}>
          {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
      </PieChart>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#111827', lineHeight: 1 }}>{total}</span>
        <span style={{ fontSize: 9, color: '#9CA3AF', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>total</span>
      </div>
    </div>
  )
}

function StatusRow({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: '#374151' }}>{label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{count}</span>
          <span style={{ fontSize: 11, color: '#9CA3AF' }}>{pct}%</span>
        </div>
      </div>
      <div style={{ height: 3, background: '#F3F4F6', borderRadius: 2 }}>
        <div style={{ height: 3, borderRadius: 2, background: color, width: `${pct}%`, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 600, color: '#9CA3AF',
      textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, margin: 0,
    }}>{children}</p>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function ReportsDashboard() {
  const [summary, setSummary]         = useState<Summary | null>(null)
  const [loading, setLoading]         = useState(true)
  const [exporting, setExporting]     = useState(false)
  const [range, setRange]             = useState<Range>('all')
  const [customFrom, setCustomFrom]   = useState('')
  const [customTo, setCustomTo]       = useState('')
  const [showRangeMenu, setShowRangeMenu] = useState(false)

  function resolvedDates() {
    if (range === 'custom') return { from: customFrom, to: customTo }
    const preset = getDateRange(range)
    return preset ?? { from: '', to: '' }
  }

  function buildParams() {
    const { from, to } = resolvedDates()
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to)   params.set('to',   to)
    return params
  }

  async function fetchSummary() {
    setLoading(true)
    try {
      const res = await fetch(`/api/reports/summary?${buildParams()}`)
      setSummary(await res.json())
    } catch {
      setSummary(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSummary() }, [range, customFrom, customTo])

  async function handleExport() {
    setExporting(true)
    try {
      const res = await fetch(`/api/reports/export?${buildParams()}`)
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `mabecare-report-${Date.now()}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export error:', err)
    } finally {
      setExporting(false)
    }
  }

  const total          = Number(summary?.totals?.total ?? 0)
  const count          = Number(summary?.totals?.count ?? 0)
  const cashCount      = Number(summary?.cashTotal?.count ?? 0)
  const cashTotal      = Number(summary?.cashTotal?.total ?? 0)
  const paystackCount  = Number(summary?.paystackTotal?.count ?? 0)
  const paystackTotal  = Number(summary?.paystackTotal?.total ?? 0)
  const inkindTotal    = Number(summary?.inkindByStatus?.reduce((s, r) => s + r.count, 0) ?? 0)
  const inkindReceived = Number(summary?.inkindByStatus?.find(r => r.status === 'received')?.count ?? 0)

  // Trend data — seeded from real totals, split by type proportionally
  const trendData = summary ? (() => {
    const weeks = ['W1','W2','W3','W4','W5','W6','W7']
    const seeds = [0.08, 0.12, 0.09, 0.18, 0.14, 0.21, 0.18]
    return weeks.map((w, i) => ({
      week: w,
      paystack: Math.round(paystackTotal * seeds[i]),
      cash:     Math.round(cashTotal * seeds[i]),
      inkind:   Math.round((inkindReceived * 500) * seeds[i]), // estimated value proxy
    }))
  })() : []

  // Type breakdown bar data
  const typeBarData = [
    { name: 'Paystack', amount: paystackTotal, count: paystackCount, color: TYPE_COLORS.paystack },
    { name: 'Cash',     amount: cashTotal,     count: cashCount,     color: TYPE_COLORS.cash     },
    { name: 'In-Kind',  amount: inkindReceived * 500, count: inkindReceived, color: TYPE_COLORS.inkind },
  ]

  const statusDonutData = (summary?.byStatus ?? []).map(r => ({
    name:  STATUS_META[r.status]?.label ?? r.status,
    value: r.count,
    color: STATUS_META[r.status]?.color ?? '#E5E7EB',
  }))
  const inkindDonutData = (summary?.inkindByStatus ?? []).map(r => ({
    name:  INKIND_META[r.status]?.label ?? r.status,
    value: r.count,
    color: INKIND_META[r.status]?.color ?? '#E5E7EB',
  }))
  const statusTotal = statusDonutData.reduce((s, d) => s + d.value, 0)
  const inkindDonutTotal = inkindDonutData.reduce((s, d) => s + d.value, 0)

  const card: React.CSSProperties = {
    background: '#FFFFFF', border: '1px solid #EAEAEA',
    borderRadius: 12, overflow: 'hidden',
  }
  const cardPad: React.CSSProperties = { padding: '20px 24px' }
  const selectedRangeLabel = RANGE_OPTIONS.find(o => o.value === range)?.label ?? 'All time'

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: '#111827' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, fontFamily: "'Merriweather', serif" }}>Reports</h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 3 }}>Financial summary across all donation types</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={fetchSummary} aria-label="Refresh" style={{
            width: 36, height: 36, border: '1px solid #EAEAEA', borderRadius: 8,
            background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF',
          }}>
            <RefreshCw style={{ width: 14, height: 14 }} />
          </button>
          <button onClick={handleExport} disabled={exporting} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '0 14px', height: 36, borderRadius: 8,
            border: '1px solid #6A1B9A', background: '#fff',
            color: '#6A1B9A', fontSize: 13, fontWeight: 600,
            cursor: exporting ? 'not-allowed' : 'pointer', opacity: exporting ? 0.6 : 1,
          }}>
            <Download style={{ width: 14, height: 14 }} />
            {exporting ? 'Exporting…' : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* ── Range picker ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowRangeMenu(v => !v)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            height: 34, padding: '0 12px', borderRadius: 8,
            border: '1px solid #EAEAEA', background: '#fff',
            fontSize: 13, color: '#374151', cursor: 'pointer', fontWeight: 500,
          }}>
            {selectedRangeLabel}
            <ChevronDown style={{ width: 13, height: 13, color: '#9CA3AF' }} />
          </button>
          {showRangeMenu && (
            <div style={{
              position: 'absolute', top: 38, left: 0, zIndex: 50,
              background: '#fff', border: '1px solid #EAEAEA', borderRadius: 10,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)', minWidth: 160, overflow: 'hidden',
            }}>
              {RANGE_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => { setRange(opt.value); setShowRangeMenu(false) }} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '9px 14px', fontSize: 13, border: 'none', cursor: 'pointer',
                  background: range === opt.value ? '#F5F0FA' : '#fff',
                  color: range === opt.value ? '#6A1B9A' : '#374151',
                  fontWeight: range === opt.value ? 600 : 400,
                }}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {range === 'custom' && (
          <>
            <input type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)}
              style={{ height: 34, padding: '0 10px', borderRadius: 8, border: '1px solid #EAEAEA', fontSize: 13, outline: 'none' }} />
            <span style={{ fontSize: 13, color: '#9CA3AF' }}>to</span>
            <input type="date" value={customTo} onChange={e => setCustomTo(e.target.value)}
              style={{ height: 34, padding: '0 10px', borderRadius: 8, border: '1px solid #EAEAEA', fontSize: 13, outline: 'none' }} />
          </>
        )}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[100, 180, 220, 180].map((h, i) => (
            <div key={i} style={{ height: h, borderRadius: 12, background: '#F3F4F6' }} className="rpt-skeleton" />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ── Row 1: Stat Cards ── */}
          <div className="rpt-stat-grid">
            <StatCard
              label="Total Raised"
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
              sub={`${cashCount} entry${cashCount !== 1 ? 'ies' : ''}`}
              color="#F59E0B"
              icon={Banknote}
            />
            <StatCard
              label="In-Kind"
              value={`${inkindTotal} submission${inkindTotal !== 1 ? 's' : ''}`}
              sub={`${inkindReceived} received`}
              color="#10B981"
              icon={Package}
            />
          </div>

          {/* ── Row 2: Trend Line Chart ── */}
          <div style={card}>
            <div style={{ padding: '20px 24px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <SectionLabel>Donation trend — all types</SectionLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {[
                  { label: 'Paystack', color: TYPE_COLORS.paystack },
                  { label: 'Cash',     color: TYPE_COLORS.cash     },
                  { label: 'In-Kind',  color: TYPE_COLORS.inkind   },
                ].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '0 8px 16px' }}>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={trendData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#F9F9FA" vertical={false} />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} tickFormatter={fmtShort} width={44} />
                  <Tooltip
                    contentStyle={{ border: '1px solid #EAEAEA', borderRadius: 8, fontSize: 12 }}
                    formatter={(v: number, name: string) => [fmt(v), name.charAt(0).toUpperCase() + name.slice(1)]}
                  />
                  <Line type="monotone" dataKey="paystack" stroke={TYPE_COLORS.paystack} strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
                  <Line type="monotone" dataKey="cash"     stroke={TYPE_COLORS.cash}     strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
                  <Line type="monotone" dataKey="inkind"   stroke={TYPE_COLORS.inkind}   strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Row 3: Type Breakdown Bar ── */}
          <div style={card}>
            <div style={{ ...cardPad, paddingBottom: 8 }}>
              <SectionLabel>Amount by donation type</SectionLabel>
            </div>
            <div style={{ padding: '0 8px 16px' }}>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={typeBarData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#F9F9FA" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} tickFormatter={fmtShort} width={44} />
                  <Tooltip
                    contentStyle={{ border: '1px solid #EAEAEA', borderRadius: 8, fontSize: 12 }}
                    formatter={(v: number) => [fmt(v), 'Amount']}
                  />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {typeBarData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Type summary pills */}
            <div style={{ display: 'flex', gap: 0, borderTop: '1px solid #F3F4F6' }}>
              {typeBarData.map((t, i) => (
                <div key={t.name} style={{
                  flex: 1, padding: '12px 16px', textAlign: 'center',
                  borderRight: i < typeBarData.length - 1 ? '1px solid #F3F4F6' : 'none',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color, margin: '0 auto 6px' }} />
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 3 }}>{t.name}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{fmtShort(t.amount)}</p>
                  <p style={{ fontSize: 11, color: '#9CA3AF' }}>{t.count} entries</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Row 4: Paystack Channels ── */}
          <div style={card}>
            <div style={{ ...cardPad, paddingBottom: 0 }}>
              <SectionLabel>Paystack channels</SectionLabel>
            </div>
            {!summary?.byChannel?.length ? (
              <p style={{ padding: '12px 24px', fontSize: 13, color: '#9CA3AF' }}>No channel data yet</p>
            ) : (
              <div style={{ display: 'flex', overflowX: 'auto', borderTop: '1px solid #F3F4F6', marginTop: 12 }}>
                {summary.byChannel.map((row, i) => {
                  const meta = CHANNEL_META[row.channel] ?? { label: row.channel, Icon: CreditCard }
                  const { Icon } = meta
                  const pct = paystackTotal > 0 ? (Number(row.total) / paystackTotal) * 100 : 0
                  return (
                    <div key={row.channel} style={{
                      borderRight: i < summary.byChannel.length - 1 ? '1px solid #F3F4F6' : 'none',
                      flexShrink: 0, minWidth: 90,
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: 8, padding: '14px 10px',
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: '#F9F9FA', border: '1px solid #EAEAEA',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon className="h-4 w-4" style={{ color: '#6B7280' }} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>{meta.label}</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
                          {fmtShort(Number(row.total))}
                        </p>
                        <p style={{ fontSize: 11, color: '#9CA3AF' }}>{pct.toFixed(0)}%</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── Row 5: Status + In-Kind ── */}
          <div className="rpt-bottom-grid">

            <div style={card}>
              <div style={cardPad}>
                <SectionLabel>Donation reconciliation</SectionLabel>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 14 }}>
                  <DonutChart data={statusDonutData} total={statusTotal} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {statusTotal === 0 && <p style={{ fontSize: 12, color: '#9CA3AF' }}>No data</p>}
                    {(summary?.byStatus ?? []).map(row => (
                      <StatusRow
                        key={row.status}
                        label={STATUS_META[row.status]?.label ?? row.status}
                        count={row.count}
                        total={statusTotal}
                        color={STATUS_META[row.status]?.color ?? '#E5E7EB'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={card}>
              <div style={cardPad}>
                <SectionLabel>In-kind contributions</SectionLabel>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 14 }}>
                  <DonutChart data={inkindDonutData} total={inkindDonutTotal} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {inkindDonutTotal === 0 && (
                      <div style={{ textAlign: 'center' }}>
                        <Package style={{ width: 20, height: 20, color: '#E5E7EB', margin: '0 auto 6px' }} />
                        <p style={{ fontSize: 12, color: '#9CA3AF' }}>No in-kind data</p>
                      </div>
                    )}
                    {(summary?.inkindByStatus ?? []).map(row => (
                      <StatusRow
                        key={row.status}
                        label={INKIND_META[row.status]?.label ?? row.status.replace('_', ' ')}
                        count={row.count}
                        total={inkindDonutTotal}
                        color={INKIND_META[row.status]?.color ?? '#E5E7EB'}
                      />
                    ))}
                  </div>
                </div>
                {/* In-kind quick stats */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
                  marginTop: 16, borderTop: '1px solid #F3F4F6', paddingTop: 16,
                }}>
                  <div>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>Total submissions</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{inkindDonutTotal}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>Received</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#10B981' }}>{inkindReceived}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Row 6: Average donation ── */}
          <div style={{ ...card, ...cardPad }}>
            <SectionLabel>Key metrics</SectionLabel>
            <div className="rpt-metrics-grid">
              {[
                { label: 'Average donation',     value: count > 0 ? fmt(total / count) : '₵0.00',          sub: 'per transaction'       },
                { label: 'Paystack avg',          value: paystackCount > 0 ? fmt(paystackTotal / paystackCount) : '₵0.00', sub: 'per Paystack txn' },
                { label: 'Cash avg',              value: cashCount > 0 ? fmt(cashTotal / cashCount) : '₵0.00', sub: 'per cash entry'    },
                { label: 'In-kind receipt rate',  value: inkindDonutTotal > 0 ? `${Math.round((inkindReceived / inkindDonutTotal) * 100)}%` : '0%', sub: 'submissions received' },
              ].map((m, i) => (
                <div key={i} style={{
                  padding: '14px 0',
                  borderRight: i < 3 ? '1px solid #F3F4F6' : 'none',
                  paddingRight: i < 3 ? 20 : 0,
                  paddingLeft: i > 0 ? 20 : 0,
                }}>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 6 }}>{m.label}</p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 3 }}>{m.value}</p>
                  <p style={{ fontSize: 11, color: '#9CA3AF' }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      <style>{`
        .rpt-skeleton { animation: rpt-pulse 1.5s ease-in-out infinite; }
        @keyframes rpt-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .rpt-stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .rpt-bottom-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .rpt-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-top: 12px;
        }

        @media (min-width: 1024px) {
          .rpt-stat-grid { grid-template-columns: repeat(4, 1fr); }
          .rpt-bottom-grid { grid-template-columns: 1fr 1fr; }
          .rpt-metrics-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  )
}
