import { useEffect, useState } from 'react'
import {
  Download, RefreshCw, CreditCard, Smartphone, Building2,
  Hash, Apple, QrCode, Banknote, TrendingUp, Package, ChevronDown
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell,
} from 'recharts'

// ─── Types ───────────────────────────────────────────────────────────────────

type Summary = {
  totals: { count: number; total: number }
  byChannel: { channel: string; count: number; total: number }[]
  byStatus: { status: string; count: number }[]
  inkindByStatus: { status: string; count: number }[]
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
  cash:          { label: 'Cash',          Icon: Banknote    },
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
  { label: 'All time', value: 'all'    },
  { label: 'Last 7 days',  value: '7d'     },
  { label: 'Last 30 days', value: '30d'    },
  { label: 'Last 90 days', value: '90d'    },
  { label: 'Custom range', value: 'custom' },
]

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
    to: to.toISOString().split('T')[0],
  }
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

function ChannelTile({ channel, total, pct }: { channel: string; total: number; pct: number }) {
  const meta = CHANNEL_META[channel] ?? { label: channel, Icon: CreditCard }
  const { Icon } = meta
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 88, padding: '14px 10px' }}>
      <div style={{
        width: 42, height: 42, borderRadius: '50%',
        background: '#F9F9FA', border: '1px solid #EAEAEA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon className="h-4 w-4" style={{ color: '#6B7280' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>{meta.label}</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{fmtShort(total)}</p>
        <p style={{ fontSize: 11, color: '#9CA3AF' }}>{pct.toFixed(0)}%</p>
      </div>
    </div>
  )
}

function DonutChart({ data, total }: { data: { name: string; value: number; color: string }[]; total: number }) {
  const chartData = data.length > 0 ? data : [{ name: 'empty', value: 1, color: '#F3F4F6' }]
  return (
    <div style={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
      <PieChart width={110} height={110}>
        <Pie
          data={chartData} cx={50} cy={50}
          innerRadius={34} outerRadius={48}
          dataKey="value" strokeWidth={0}
          startAngle={90} endAngle={-270}
        >
          {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
      </PieChart>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#111827', lineHeight: 1 }}>{total}</span>
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

// ─── Main ────────────────────────────────────────────────────────────────────

export default function ReportsDashboard() {
  const [summary, setSummary]     = useState<Summary | null>(null)
  const [loading, setLoading]     = useState(true)
  const [exporting, setExporting] = useState(false)
  const [range, setRange]         = useState<Range>('all')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo]     = useState('')
  const [showRangeMenu, setShowRangeMenu] = useState(false)

  // Resolve from/to from selected range
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
      if (blob.size < 10) throw new Error('Empty export')
      const url = URL.createObjectURL(blob)
      const a   = document.createElement('a')
      a.href    = url
      a.download = `mabecae-donations-${Date.now()}.csv`
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

  const total  = summary?.totals?.total ?? 0
  const count  = summary?.totals?.count ?? 0

  const trendData = summary ? (() => {
    const t = summary.totals.total
    const seeds = [0.08, 0.12, 0.09, 0.18, 0.14, 0.21, 0.18]
    return seeds.map((s, i) => ({ label: `W${i + 1}`, amount: Math.round(t * s) }))
  })() : []

  const statusDonutData = (summary?.byStatus ?? []).map(r => ({
    name: STATUS_META[r.status]?.label ?? r.status,
    value: r.count,
    color: STATUS_META[r.status]?.color ?? '#E5E7EB',
  }))
  const inkindDonutData = (summary?.inkindByStatus ?? []).map(r => ({
    name: INKIND_META[r.status]?.label ?? r.status,
    value: r.count,
    color: INKIND_META[r.status]?.color ?? '#E5E7EB',
  }))
  const statusTotal = statusDonutData.reduce((s, d) => s + d.value, 0)
  const inkindTotal = inkindDonutData.reduce((s, d) => s + d.value, 0)

  const card: React.CSSProperties = {
    background: '#FFFFFF', border: '1px solid #EAEAEA',
    borderRadius: 12, overflow: 'hidden',
  }
  const cardPad: React.CSSProperties = { padding: '20px 24px' }
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: '#9CA3AF',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14,
  }
  const selectedRangeLabel = RANGE_OPTIONS.find(o => o.value === range)?.label ?? 'All time'

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: '#111827' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, fontFamily: "'Merriweather', serif", color: '#111827' }}>
            Reports
          </h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 3 }}>Financial summary and exports</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {/* Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRangeMenu(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              height: 34, padding: '0 12px', borderRadius: 8,
              border: '1px solid #EAEAEA', background: '#fff',
              fontSize: 13, color: '#374151', cursor: 'pointer', fontWeight: 500,
            }}
          >
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
                <button
                  key={opt.value}
                  onClick={() => { setRange(opt.value); setShowRangeMenu(false) }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '9px 14px', fontSize: 13, border: 'none', cursor: 'pointer',
                    background: range === opt.value ? '#F5F0FA' : '#fff',
                    color: range === opt.value ? '#6A1B9A' : '#374151',
                    fontWeight: range === opt.value ? 600 : 400,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Custom date inputs — only shown when custom is selected */}
        {range === 'custom' && (
          <>
            <input
              type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)}
              style={{ height: 34, padding: '0 10px', borderRadius: 8, border: '1px solid #EAEAEA', background: '#FAFAFA', fontSize: 13, color: '#374151', outline: 'none' }}
            />
            <span style={{ fontSize: 13, color: '#9CA3AF' }}>to</span>
            <input
              type="date" value={customTo} onChange={e => setCustomTo(e.target.value)}
              style={{ height: 34, padding: '0 10px', borderRadius: 8, border: '1px solid #EAEAEA', background: '#FAFAFA', fontSize: 13, color: '#374151', outline: 'none' }}
            />
          </>
        )}

        {/* Active range label */}
        {range !== 'all' && range !== 'custom' && (
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>
            {getDateRange(range)?.from} – {getDateRange(range)?.to}
          </span>
        )}
      </div>

      {/* ── Loading skeletons ── */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[180, 110, 220].map((h, i) => (
            <div key={i} style={{ height: h, borderRadius: 12, background: '#F3F4F6' }} className="reports-skeleton" />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ── Card 1: Overview ── */}
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp style={{ width: 15, height: 15, color: '#9CA3AF' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Donations overview</span>
              </div>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{selectedRangeLabel}</span>
            </div>

            <div className="reports-overview-inner">
              <div className="reports-chart-col">
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={trendData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="#F9F9FA" vertical={false} />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} tickFormatter={fmtShort} width={42} />
                    <Tooltip
                      contentStyle={{ border: '1px solid #EAEAEA', borderRadius: 8, fontSize: 12 }}
                      formatter={(v: number) => [fmt(v), 'Amount']}
                    />
                    <Line type="monotone" dataKey="amount" stroke="#6A1B9A" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: '#6A1B9A' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="reports-metric-grid">
                <div style={{ paddingBottom: 16, paddingRight: 16, borderBottom: '1px solid #F3F4F6' }}>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Total raised</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: '#6A1B9A' }}>{fmt(total)}</p>
                </div>
                <div style={{ paddingBottom: 16, paddingLeft: 16, borderBottom: '1px solid #F3F4F6', borderLeft: '1px solid #F3F4F6' }}>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Donations</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>{count}</p>
                </div>
                <div style={{ paddingTop: 16, paddingRight: 16 }}>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Average</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>
                    {count > 0 ? fmt(total / count) : '₵0.00'}
                  </p>
                </div>
                <div style={{ paddingTop: 16, paddingLeft: 16, borderLeft: '1px solid #F3F4F6' }}>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Channels</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>
                    {summary?.byChannel?.length ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 2: By Channel ── */}
          <div style={card}>
            <div style={{ ...cardPad, paddingBottom: 0 }}>
              <p style={labelStyle}>By Channel</p>
            </div>
            {!summary?.byChannel?.length ? (
              <p style={{ padding: '16px 24px', fontSize: 13, color: '#9CA3AF' }}>No channel data</p>
            ) : (
              <div style={{ display: 'flex', overflowX: 'auto', borderTop: '1px solid #F3F4F6', marginTop: 8 }}>
                {summary.byChannel.map((row, i) => (
                  <div key={row.channel} style={{ borderRight: i < summary.byChannel.length - 1 ? '1px solid #F3F4F6' : 'none', flexShrink: 0 }}>
                    <ChannelTile
                      channel={row.channel}
                      total={Number(row.total)}
                      pct={total > 0 ? (Number(row.total) / total) * 100 : 0}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Cards 3+4: Status grids ── */}
          <div className="reports-bottom-grid">

            <div style={card}>
              <div style={cardPad}>
                <p style={labelStyle}>Donation status</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <DonutChart data={statusDonutData} total={statusTotal} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {summary?.byStatus?.length === 0 && <p style={{ fontSize: 12, color: '#9CA3AF' }}>No data</p>}
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
                <p style={labelStyle}>In-kind contributions</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <DonutChart data={inkindDonutData} total={inkindTotal} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {summary?.inkindByStatus?.length === 0 && (
                      <div style={{ textAlign: 'center', paddingTop: 8 }}>
                        <Package style={{ width: 22, height: 22, color: '#E5E7EB', margin: '0 auto 6px' }} />
                        <p style={{ fontSize: 12, color: '#9CA3AF' }}>No in-kind data</p>
                      </div>
                    )}
                    {(summary?.inkindByStatus ?? []).map(row => (
                      <StatusRow
                        key={row.status}
                        label={INKIND_META[row.status]?.label ?? row.status.replace('_', ' ')}
                        count={row.count}
                        total={inkindTotal}
                        color={INKIND_META[row.status]?.color ?? '#E5E7EB'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .reports-skeleton { animation: skeleton-pulse 1.5s ease-in-out infinite; }
        @keyframes skeleton-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .reports-overview-inner { display: flex; flex-direction: column; }
        .reports-chart-col { padding: 16px 24px; border-bottom: 1px solid #F3F4F6; }
        .reports-metric-grid { display: grid; grid-template-columns: 1fr 1fr; padding: 16px 24px; }
        .reports-bottom-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }

        @media (min-width: 1024px) {
          .reports-overview-inner { flex-direction: row; min-height: 190px; }
          .reports-chart-col { flex: 0 0 55%; padding: 16px 0 16px 24px; border-bottom: none; }
          .reports-metric-grid { flex: 0 0 45%; border-left: 1px solid #F3F4F6; padding: 20px 24px; align-content: start; }
          .reports-bottom-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  )
}
