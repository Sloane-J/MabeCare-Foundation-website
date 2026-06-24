import { useEffect, useState } from 'react'
import { Download, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  reconciled: 'bg-blue-100 text-blue-800',
}

export default function ReportsDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [exporting, setExporting] = useState(false)

  async function fetchSummary() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (from) params.set('from', from)
      if (to) params.set('to', to)
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
      if (to) params.set('to', to)
      const res = await fetch(`/api/reports/export?${params}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `donations-${Date.now()}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  const total = summary?.totals?.total ?? 0
  const count = summary?.totals?.count ?? 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold lg:text-2xl">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Financial summary and exports
          </p>
        </div>
        <Button
          onClick={handleExport}
          disabled={exporting}
          size="sm"
          className="bg-primary text-primary-foreground shrink-0"
        >
          <Download className="mr-1.5 h-4 w-4" />
          {exporting ? 'Exporting...' : 'CSV'}
        </Button>
      </div>

      {/* Date Filter */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <input
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="rounded-lg border border-border bg-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <span className="text-sm text-muted-foreground">to</span>
          <input
            type="date"
            value={to}
            onChange={e => setTo(e.target.value)}
            className="rounded-lg border border-border bg-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={fetchSummary}
          className="h-9"
        >
          Apply
        </Button>
        {(from || to) && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => { setFrom(''); setTo(''); }}
            className="h-9 text-muted-foreground"
          >
            Clear
          </Button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <>
          {/* Total */}
          <Card className="border-primary/30 bg-accent">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Raised</p>
              <p className="mt-1 text-3xl font-bold text-primary">
                ₵{total.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                across {count} donation{count !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          {/* By Channel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">By Channel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {summary?.byChannel?.length === 0 && (
                <p className="text-sm text-muted-foreground">No data</p>
              )}
              {summary?.byChannel?.map(row => {
                const pct = total > 0 ? (Number(row.total) / total) * 100 : 0
                return (
                  <div key={row.channel} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{CHANNEL_LABELS[row.channel] ?? row.channel}</span>
                      <span className="font-medium">
                        ₵{Number(row.total).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                        <span className="ml-1.5 text-xs text-muted-foreground">
                          ({row.count})
                        </span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* By Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">By Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {summary?.byStatus?.length === 0 && (
                <p className="text-sm text-muted-foreground">No data</p>
              )}
              {summary?.byStatus?.map(row => (
                <div
                  key={row.status}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium',
                    STATUS_COLORS[row.status] ?? 'bg-muted text-muted-foreground'
                  )}
                >
                  <span className="capitalize">{row.status}</span>
                  <span className="ml-1.5 font-bold">{row.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* In-Kind */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">In-Kind by Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {summary?.inkindByStatus?.length === 0 && (
                <p className="text-sm text-muted-foreground">No data</p>
              )}
              {summary?.inkindByStatus?.map(row => (
                <div
                  key={row.status}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                >
                  <span className="capitalize">{row.status.replace('_', ' ')}</span>
                  <span className="ml-1.5 font-bold">{row.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
