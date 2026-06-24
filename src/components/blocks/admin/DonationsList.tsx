import { useEffect, useState } from 'react'
import { Plus, Filter, RefreshCw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type Donation = {
  id: string
  type: 'paystack' | 'cash'
  channel: string | null
  amount: number
  currency: string
  donor_name: string | null
  donor_email: string | null
  date: string
  reference: string | null
  status: 'pending' | 'confirmed' | 'reconciled'
  note: string | null
  created_at: string
}

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  reconciled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
}

const CHANNEL_LABELS: Record<string, string> = {
  card: 'Card',
  mobile_money: 'MoMo',
  bank_transfer: 'Bank',
  ussd: 'USSD',
  apple_pay: 'Apple Pay',
  qr: 'QR',
  cash: 'Cash',
}

function StatusBadge({ status }: { status: Donation['status'] }) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        STATUS_COLORS[status]
      )}
    >
      {status}
    </span>
  )
}

function CashDonationForm({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void
  onClose: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    amount: '',
    donor_name: '',
    donor_email: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  })

  async function handleSubmit() {
    setError(null)
    if (!form.amount || !form.date) {
      setError('Amount and date are required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error)
      }
      onSuccess()
      onClose()
    } catch (e: any) {
      setError(e.message ?? 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Amount (GHS) *</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="0.00"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Date *</label>
        <input
          type="date"
          value={form.date}
          onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
          className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Donor Name</label>
        <input
          type="text"
          value={form.donor_name}
          onChange={e => setForm(f => ({ ...f, donor_name: e.target.value }))}
          className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Optional"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Donor Email</label>
        <input
          type="email"
          value={form.donor_email}
          onChange={e => setForm(f => ({ ...f, donor_email: e.target.value }))}
          className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Optional"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Note</label>
        <textarea
          value={form.note}
          onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
          className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          rows={3}
          placeholder="Optional"
        />
      </div>
      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading} className="flex-1 bg-primary text-primary-foreground">
          {loading ? 'Saving...' : 'Save Donation'}
        </Button>
      </div>
    </div>
  )
}

export default function DonationsList() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState<Donation | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [updating, setUpdating] = useState(false)

  async function fetchDonations() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (typeFilter !== 'all') params.set('type', typeFilter)
      const res = await fetch(`/api/donations?${params}`)
      const data = await res.json()
      setDonations(Array.isArray(data) ? data : [])
    } catch {
      setDonations([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDonations() }, [statusFilter, typeFilter])

  async function updateStatus(id: string, status: string) {
    setUpdating(true)
    try {
      await fetch(`/api/donations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      await fetchDonations()
      setSelected(prev => prev ? { ...prev, status: status as Donation['status'] } : null)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold lg:text-2xl">Donations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {donations.length} record{donations.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDonations}
            className="h-9 w-9 p-0"
            aria-label="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => setShowForm(true)}
            className="bg-primary text-primary-foreground"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Cash
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="reconciled">Reconciled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-9 w-36 text-xs">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="paystack">Paystack</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : donations.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-12 text-center">
          <p className="text-sm text-muted-foreground">No donations found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {donations.map(d => (
            <button
              key={d.id}
              onClick={() => setSelected(d)}
              className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {d.donor_name ?? 'Anonymous'}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {d.channel ? CHANNEL_LABELS[d.channel] ?? d.channel : 'Cash'} ·{' '}
                    {new Date(d.date).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-sm font-bold text-primary">
                    ₵{Number(d.amount).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                  </span>
                  <StatusBadge status={d.status} />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Cash Donation Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Record Cash Donation</DialogTitle>
          </DialogHeader>
          <CashDonationForm
            onSuccess={fetchDonations}
            onClose={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={v => !v && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-bold text-primary">
                    ₵{Number(selected.amount).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{selected.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Channel</p>
                  <p className="font-medium">
                    {selected.channel ? CHANNEL_LABELS[selected.channel] ?? selected.channel : 'Cash'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(selected.date).toLocaleDateString('en-GB')}
                  </p>
                </div>
                {selected.donor_name && (
                  <div>
                    <p className="text-xs text-muted-foreground">Donor</p>
                    <p className="font-medium">{selected.donor_name}</p>
                  </div>
                )}
                {selected.donor_email && (
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{selected.donor_email}</p>
                  </div>
                )}
                {selected.reference && (
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Reference</p>
                    <p className="font-mono text-xs">{selected.reference}</p>
                  </div>
                )}
                {selected.note && (
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Note</p>
                    <p>{selected.note}</p>
                  </div>
                )}
              </div>

              {/* Status update */}
              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm font-medium">Update Status</p>
                <div className="flex gap-2">
                  {(['pending', 'confirmed', 'reconciled'] as const).map(s => (
                    <button
                      key={s}
                      disabled={selected.status === s || updating}
                      onClick={() => updateStatus(selected.id, s)}
                      className={cn(
                        'flex-1 rounded-lg px-3 py-2 text-xs font-medium capitalize transition-colors',
                        selected.status === s
                          ? STATUS_COLORS[s]
                          : 'bg-muted text-muted-foreground hover:bg-muted/70'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
