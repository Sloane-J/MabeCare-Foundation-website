import { useEffect, useState } from 'react'
import { TrendingUp, Wallet, Package, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  reconciled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
}

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  title: string
  value: string
  sub?: string
  icon: React.ElementType
  accent?: boolean
}) {
  return (
    <Card className={cn(accent && 'border-primary/30 bg-accent')}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn('h-4 w-4', accent ? 'text-primary' : 'text-muted-foreground')} />
      </CardHeader>
      <CardContent>
        <p className={cn('text-2xl font-bold', accent && 'text-primary')}>{value}</p>
        {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  )
}

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

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
        {error}
      </div>
    )
  }

  const total = summary?.totals?.total ?? 0
  const count = summary?.totals?.count ?? 0
  const pending = summary?.byStatus?.find(s => s.status === 'pending')?.count ?? 0
  const inkindSubmitted = summary?.inkindByStatus?.find(s => s.status === 'submitted')?.count ?? 0
  const inkindInTransit = summary?.inkindByStatus?.find(s => s.status === 'in_transit')?.count ?? 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold lg:text-2xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of all donations and activity
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          title="Total Raised"
          value={`₵${total.toLocaleString('en-GH', { minimumFractionDigits: 2 })}`}
          sub={`${count} donation${count !== 1 ? 's' : ''}`}
          icon={TrendingUp}
          accent
        />
        <StatCard
          title="Pending Review"
          value={String(pending)}
          sub="Need confirmation"
          icon={Clock}
        />
        <StatCard
          title="In-Kind Pending"
          value={String(inkindSubmitted)}
          sub="Awaiting dispatch"
          icon={Package}
        />
        <StatCard
          title="In Transit"
          value={String(inkindInTransit)}
          sub="Items on the way"
          icon={Wallet}
        />
      </div>

      {/* By Channel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Donations by Channel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {summary?.byChannel?.length === 0 && (
            <p className="text-sm text-muted-foreground">No donations yet.</p>
          )}
          {summary?.byChannel?.map(row => (
            <div key={row.channel} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">
                  {CHANNEL_LABELS[row.channel] ?? row.channel}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({row.count})
                </span>
              </div>
              <span className="text-sm font-medium">
                ₵{Number(row.total).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* By Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Donations by Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {summary?.byStatus?.length === 0 && (
            <p className="text-sm text-muted-foreground">No donations yet.</p>
          )}
          {summary?.byStatus?.map(row => (
            <div
              key={row.status}
              className={cn(
                'flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium',
                STATUS_COLORS[row.status]
              )}
            >
              <span className="capitalize">{row.status}</span>
              <span className="font-bold">{row.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* In-Kind Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">In-Kind Submissions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {summary?.inkindByStatus?.length === 0 && (
            <p className="text-sm text-muted-foreground">No in-kind submissions yet.</p>
          )}
          {summary?.inkindByStatus?.map(row => (
            <div
              key={row.status}
              className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium"
            >
              <span className="capitalize">{row.status.replace('_', ' ')}</span>
              <span className="font-bold">{row.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
