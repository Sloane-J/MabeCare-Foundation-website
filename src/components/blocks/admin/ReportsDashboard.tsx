import { useEffect, useState } from 'react'
import { Download, Calendar, RefreshCw, CreditCard, Smartphone, Building2, Hash, Apple, QrCode, Banknote, TrendingUp, Package } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from 'recharts'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

type Summary = {
  totals: { count: number; total: number }
  byChannel: { channel: string; count: number; total: number }[]
  byStatus: { status: string; count: number }[]
  inkindByStatus: { status: string; count: number }[]
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CHANNEL_META: Record<string, { label: string; Icon: React.FC<{ className?: string }> }> = {
  card:          { label: 'Card',              Icon: CreditCard   },
  mobile_money:  { label: 'Mobile Money',      Icon: Smartphone   },
  bank_transfer: { label: 'Bank Transfer',     Icon: Building2    },
  ussd:          { label: 'USSD',              Icon: Hash         },
  apple_pay:     { label: 'Apple Pay',         Icon: Apple        },
  qr:            { label: 'QR Code',           Icon: QrCode       },
  cash:          { label: 'Cash',              Icon: Banknote     },
}

const STATUS_META: Record<string, { label: string; color: string; dot: string }> = {
  pending:    { label: 'Pending',    color: '#F59E0B', dot: '#FDE68A' },
  confirmed:  { label: 'Confirmed',  color: '#6A1B9A', dot: '#C4B5FD' },
  reconciled: { label: 'Reconciled', color: '#10B981', dot: '#6EE7B7' },
}

const INKIND_META: Record<string, { label: string; color: string }> = {
  submitted:  { label: 'Submitted',  color: '#F59E0B' },
  in_transit: { label: 'In Transit', color: '#3B82F6' },
  received:   { label: 'Received',   color: '#10B981' },
}

function fmt(v: number) {
  return `₵${Number(v).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`
}
function fmtShort(v: number) {
  if (v >= 1000) return `₵${(v / 1000).toFixed(1)}k`
  return `₵${v.toFixed(0)}`
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

function MetricCell({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-0">
      <p style={{ fontSize: 11, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, marginBottom: 2 }}>
        {label}
      </p>
      <p style={{ fontSize: 22, fontWeight: 700, color: '#111827', lineHeight: 1.15 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{sub}</p>}
    </div>
  )
}

function ChannelTile({ channel, count, total, pct }: { channel: string; count: number; total: number; pct: number }) {
  const meta = CHANNEL_META[channel] ?? { label: channel, Icon: CreditCard }
  const { Icon } = meta
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      minWidth: 90, padding: '12px 8px',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: '#F3F4F6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid #E5E7EB',
      }}>
        <Icon className="h-5 w-5" style={{ color: '#6B7280' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 2 }}>{meta.label}</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{fmtShort(total)}</p>
        <p style={{ fontSize: 11, color: '#9CA3AF' }}>{pct.toFixed(0)}%</p>
      </div>
    </div>
  )
}

function DonutChart({ data, total }: { data: { name: string; value: number; color: string }[]; total: number }) {
  return (
    <div style={{ position: 'relative', width: 120, height: 120 }}>
      <PieChart width={120} height={120}>
        <Pie
          data={data.length > 0 ? data : [{ name: 'empty', value: 1, color: '#F3F4F6' }]}
          cx={55} cy={55}
          innerRadius={38} outerRadius={52}
          dataKey="value"
          strokeWidth={0}
          startAngle={90} endAngle={-270}
        >
          {(data.length > 0 ? data : [{ name: 'empty', value: 1, color: '#F3F4F6' }]).map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#111827', lineHeight: 1 }}>{total}</span>
        <span style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>total</span>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ReportsDashboard() {
  const [summary, setSummary]   = useState<Summary | null>(null)
  const [loading, setLoading]   = useState(true)
  const [from, setFrom]         = useState('')
  const [to, setTo]             = useState('')
  const [exporting, setExporting] = useState(false)

  // Synthetic trend data built from summary (7 mock buckets for the line chart)
  // In production, swap this for a real /api/reports/trend endpoint
  const trendData = summary ? (() => {
    const t = summary.totals.total
    const seeds = [0.08, 0.12, 0.09, 0.18, 0.14, 0.21, 0.18]
    return seeds.map((s, i) => ({ label: `W${i + 1}`, amount: Math.round(t * s) }))
  })() : []

  async function fetchSummary() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (from) params.set('from', from)
      if (to)   params.set('to',   to)
      const res = await fetch(`/api/reports/summary?${params}`)
      setSummary(await res.json())
    } catch {
      setSummary(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSummary() }, [])

  async function handleExport() {
    setExporting(true)
    try {
      const params = new URLSearchParams()
      if (from) params.set('from', from)
      if (to)   params.set('to',   to)
      const res = await fetch(`/api/reports/export?${params}`)
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `donations-${Date.now()}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  const total  = summary?.totals?.total ?? 0
  const count  = summary?.totals?.count ?? 0

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

  const inkindTotal = inkindDonutData.reduce((s, d) => s + d.value, 0)
  const statusTotal = statusDonutData.reduce((s, d) => s + d.value, 0)

  // ── Card shell ─────────────────────────────────────────────────────────────
  const card: React.CSSProperties = {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
  }

  const cardPad: React.CSSProperties = { padding: '20px 24px' }

  const sectionLabel: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: '#9CA3AF',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    marginBottom: 14,
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: '#111827' }}>

      {/* ── Page header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#111827', fontFamily: "'Merriweather', serif" }}>
            Reports
          </h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 3 }}>Financial summary and exports</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={fetchSummary}
            style={{
              width: 36, height: 36, border: '1px solid #E5E7EB', borderRadius: 8,
              background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9CA3AF',
            }}
            aria-label="Refresh"
          >
            <RefreshCw style={{ width: 15, height: 15 }} />
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '0 14px', height: 36, borderRadius: 8,
              border: '1px solid #6A1B9A', background: '#fff',
              color: '#6A1B9A', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              opacity: exporting ? 0.6 : 1,
            }}
          >
            <Download style={{ width: 14, height: 14 }} />
            {exporting ? 'Exporting…' : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* ── Date filter bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        flexWrap: 'wrap',
      }}>
        <Calendar style={{ width: 15, height: 15, color: '#9CA3AF', flexShrink: 0 }} />
        <input
          type="date" value={from} onChange={e => setFrom(e.target.value)}
          style={{
            height: 34, padding: '0 10px', borderRadius: 8,
            border: '1px solid #E5E7EB', background: '#FAFAFA',
            fontSize: 13, color: '#374151', outline: 'none',
          }}
        />
        <span style={{ fontSize: 13, color: '#9CA3AF' }}>to</span>
        <input
          type="date" value={to} onChange={e => setTo(e.target.value)}
          style={{
            height: 34, padding: '0 10px', borderRadius: 8,
            border: '1px solid #E5E7EB', background: '#FAFAFA',
            fontSize: 13, color: '#374151', outline: 'none',
          }}
        />
        <button
          onClick={fetchSummary}
          style={{
            height: 34, padding: '0 14px', borderRadius: 8,
            border: '1px solid #E5E7EB', background: '#fff',
            fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer',
          }}
        >
          Apply
        </button>
        {(from || to) && (
          <button
            onClick={() => { setFrom(''); setTo('') }}
            style={{ height: 34, padding: '0 10px', border: 'none', background: 'none', fontSize: 13, color: '#9CA3AF', cursor: 'pointer' }}
          >
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[160, 100, 200].map((h, i) => (
            <div key={i} style={{ height: h, borderRadius: 12, background: '#F3F4F6', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ── Card 1: Donations overview (chart + metrics) ── */}
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp style={{ width: 16, height: 16, color: '#6B7280' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Donations overview</span>
              </div>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>
                {from && to ? `${from} – ${to}` : 'All time'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 0, minHeight: 200 }}>
              {/* Chart */}
              <div style={{ flex: '0 0 55%', padding: '16px 0 16px 24px' }}>
                <ResponsiveContainer width="100%" height={170}>
                  <LineChart data={trendData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="#F3F4F6" vertical={false} />
                    <XAxis
                      dataKey="label"
                      axisLine={false} tickLine={false}
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                    />
                    <YAxis
                      axisLine={false} tickLine={false}
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      tickFormatter={v => fmtShort(v)}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{ border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 12, color: '#374151' }}
                      formatter={(v: number) => [fmt(v), 'Amount']}
                    />
                    <Line
                      type="monotone" dataKey="amount"
                      stroke="#6A1B9A" strokeWidth={2}
                      dot={false} activeDot={{ r: 4, fill: '#6A1B9A' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Metric grid */}
              <div style={{
                flex: '0 0 45%',
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '0px', borderLeft: '1px solid #F3F4F6',
                padding: '20px 24px',
                alignContent: 'start',
              }}>
                <div style={{ paddingBottom: 20, paddingRight: 16, borderBottom: '1px solid #F3F4F6' }}>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Total raised</p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#6A1B9A' }}>{fmt(total)}</p>
                </div>
                <div style={{ paddingBottom: 20, paddingLeft: 16, borderBottom: '1px solid #F3F4F6', borderLeft: '1px solid #F3F4F6' }}>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Donations</p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>{count}</p>
                </div>
                <div style={{ paddingTop: 20, paddingRight: 16 }}>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Avg. donation</p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>
                    {count > 0 ? fmt(total / count) : '₵0.00'}
                  </p>
                </div>
                <div style={{ paddingTop: 20, paddingLeft: 16, borderLeft: '1px solid #F3F4F6' }}>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Channels</p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>
                    {summary?.byChannel?.length ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 2: By Channel tiles ── */}
          <div style={card}>
            <div style={{ ...cardPad, paddingBottom: 0 }}>
              <p style={sectionLabel}>By Channel</p>
            </div>
            {(!summary?.byChannel || summary.byChannel.length === 0) ? (
              <div style={{ padding: '24px', color: '#9CA3AF', fontSize: 13 }}>No channel data</div>
            ) : (
              <div style={{
                display: 'flex', gap: 0, overflowX: 'auto',
                borderTop: '1px solid #F3F4F6', marginTop: 12,
              }}>
                {summary.byChannel.map((row, i) => {
                  const pct = total > 0 ? (Number(row.total) / total) * 100 : 0
                  return (
                    <div key={row.channel} style={{
                      borderRight: i < summary.byChannel.length - 1 ? '1px solid #F3F4F6' : 'none',
                      flex: '0 0 auto',
                    }}>
                      <ChannelTile
                        channel={row.channel}
                        count={row.count}
                        total={Number(row.total)}
                        pct={pct}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── Cards 3+4: Two columns — By Status + In-Kind ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

            {/* Donation status */}
            <div style={card}>
              <div style={cardPad}>
                <p style={sectionLabel}>Donation status</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <DonutChart data={statusDonutData} total={statusTotal} />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(summary?.byStatus ?? []).map(row => {
                      const meta = STATUS_META[row.status]
                      const pct  = statusTotal > 0 ? Math.round((row.count / statusTotal) * 100) : 0
                      return (
                        <div key={row.status}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: meta?.color ?? '#E5E7EB', flexShrink: 0 }} />
                              <span style={{ fontSize: 12, color: '#374151' }}>{meta?.label ?? row.status}</span>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{row.count}</span>
                          </div>
                          <div style={{ height: 3, background: '#F3F4F6', borderRadius: 2 }}>
                            <div style={{ height: 3, borderRadius: 2, background: meta?.color ?? '#E5E7EB', width: `${pct}%`, transition: 'width 0.4s ease' }} />
                          </div>
                        </div>
                      )
                    })}
                    {(summary?.byStatus ?? []).length === 0 && (
                      <p style={{ fontSize: 12, color: '#9CA3AF' }}>No data</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* In-Kind status */}
            <div style={card}>
              <div style={cardPad}>
                <p style={sectionLabel}>In-kind contributions</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <DonutChart data={inkindDonutData} total={inkindTotal} />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {(summary?.inkindByStatus ?? []).map(row => {
                      const meta = INKIND_META[row.status]
                      const pct  = inkindTotal > 0 ? Math.round((row.count / inkindTotal) * 100) : 0
                      return (
                        <div key={row.status}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: meta?.color ?? '#E5E7EB', flexShrink: 0 }} />
                              <span style={{ fontSize: 12, color: '#374151' }}>{meta?.label ?? row.status.replace('_', ' ')}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{row.count}</span>
                              <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 4 }}>{pct}%</span>
                            </div>
                          </div>
                          <div style={{ height: 3, background: '#F3F4F6', borderRadius: 2 }}>
                            <div style={{ height: 3, borderRadius: 2, background: meta?.color ?? '#E5E7EB', width: `${pct}%`, transition: 'width 0.4s ease' }} />
                          </div>
                        </div>
                      )
                    })}
                    {(summary?.inkindByStatus ?? []).length === 0 && (
                      <div style={{ textAlign: 'center', paddingTop: 8 }}>
                        <Package style={{ width: 24, height: 24, color: '#E5E7EB', margin: '0 auto 6px' }} />
                        <p style={{ fontSize: 12, color: '#9CA3AF' }}>No in-kind data</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        input[type="date"]:focus {
          border-color: #6A1B9A !important;
          box-shadow: 0 0 0 3px rgba(106,27,154,0.1);
        }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  )
}
