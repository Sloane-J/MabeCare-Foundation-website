import { useEffect, useState } from 'react'
import { Plus, RefreshCw, Search, X, WifiOff } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type Donation = {
  id: string
  type: 'online' | 'cash'
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

const CHANNEL_LABELS: Record<string, string> = {
  card: 'Card',
  mobile_money: 'MoMo',
  bank_transfer: 'Bank',
  ussd: 'USSD',
  apple_pay: 'Apple Pay',
  qr: 'QR',
  cash: 'Cash',
}

const STATUS_STYLES = {
  pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  confirmed: 'bg-green-50 text-green-700 border border-green-200',
  reconciled: 'bg-violet-50 text-violet-700 border border-violet-200',
}

const STATUS_ACTIVE = {
  pending: 'bg-yellow-500',
  confirmed: 'bg-green-500',
  reconciled: 'bg-violet-500',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(amount: number) {
  return `₵${Number(amount).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Stat card (same Panel/Metric pattern as dashboard) ────────────────────────
function StatCard({ label, value, sub, accent }: {
  label: string; value: string | number; sub?: string; accent?: boolean
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className={cn('mt-1 text-2xl font-bold tracking-tight', accent ? 'text-violet-600' : 'text-gray-900')}>
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-gray-500">{sub}</p>}
    </div>
  )
}

// ── Filter pill ───────────────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }: {
  label: string; active: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1.5 text-xs font-medium transition-colors border',
        active
          ? 'border-violet-300 bg-violet-50 text-violet-700'
          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
      )}
    >
      {label}
    </button>
  )
}

// ── Cash form ─────────────────────────────────────────────────────────────────
function CashDonationForm({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    amount: '', donor_name: '', donor_email: '',
    date: new Date().toISOString().split('T')[0], note: '',
  })

  async function handleSubmit() {
    setError(null)
    if (!form.amount || !form.date) { setError('Amount and date are required'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      onSuccess(); onClose()
    } catch (e: any) {
      setError(e.message ?? 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  const field = 'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 transition-colors'

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Amount (GHS) *</label>
          <input type="number" min="0" step="0.01" value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
            className={field} placeholder="0.00" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Date *</label>
          <input type="date" value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            className={field} />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600">Donor Name</label>
        <input type="text" value={form.donor_name}
          onChange={e => setForm(f => ({ ...f, donor_name: e.target.value }))}
          className={field} placeholder="Optional" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600">Donor Email</label>
        <input type="email" value={form.donor_email}
          onChange={e => setForm(f => ({ ...f, donor_email: e.target.value }))}
          className={field} placeholder="Optional" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600">Note</label>
        <textarea value={form.note}
          onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
          className={field} rows={2} placeholder="Optional" />
      </div>
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
      )}
      <div className="flex gap-2 pt-1">
        <button onClick={onClose}
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={handleSubmit} disabled={loading}
          className="flex-1 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition-colors">
          {loading ? 'Saving…' : 'Save donation'}
        </button>
      </div>
    </div>
  )
}

export default function DonationsList() {
  const [donations, setDonations] = useState<Donation[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)  // add this
const [showForm, setShowForm] = useState(false)
const [selected, setSelected] = useState<Donation | null>(null)
const [statusFilter, setStatusFilter] = useState('all')
const [typeFilter, setTypeFilter] = useState('all')
const [search, setSearch] = useState('')
const [updating, setUpdating] = useState(false)

async function fetchDonations() {
  setLoading(true)
  setError(null)  // add this
  try {
    const params = new URLSearchParams()
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (typeFilter !== 'all') params.set('type', typeFilter)
    const res = await fetch(`/api/donations?${params}`)
    const data = await res.json()
    setDonations(Array.isArray(data) ? data : [])
  } catch {
    setError('failed')  // add this
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

  // Client-side search filter
  const filtered = donations.filter(d => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      d.donor_name?.toLowerCase().includes(q) ||
      d.donor_email?.toLowerCase().includes(q) ||
      d.reference?.toLowerCase().includes(q)
    )
  })

  // Stats derived from full list (unfiltered)
  const total = donations.reduce((s, d) => s + Number(d.amount), 0)
  const pending = donations.filter(d => d.status === 'pending').length
  const confirmed = donations.filter(d => d.status === 'confirmed').length
  const reconciled = donations.filter(d => d.status === 'reconciled').length

  return (
    <div className="space-y-5 pb-10">
      {/* ── Offline error state ─────────────────────────── */}
    {error && (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
        <img
          src="/images/offline.svg"
          alt="No connection"
          className="mb-6 h-36 w-36 object-contain opacity-80"
        />
        <div className="flex items-center justify-center gap-2 mb-2">
          <WifiOff className="h-4 w-4 text-yellow-600" />
          <p className="text-sm font-semibold text-gray-900">You're not connected</p>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
          Not to worry — your data is safe. This page will reload automatically once you're back online.
        </p>
        <button
          onClick={fetchDonations}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Try again
        </button>
      </div>
    )}

      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#111827', fontFamily: "'Merriweather', serif" }}>
            Financial Donations
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">Financial contributions to MabEcare Foundation</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchDonations}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 rounded-md bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add Cash
          </button>
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total raised"
          value={fmt(total)}
          sub={`${donations.length} donation${donations.length !== 1 ? 's' : ''}`}
          accent
        />
        <StatCard label="Pending" value={pending} sub="Awaiting confirmation" />
        <StatCard label="Confirmed" value={confirmed} sub="Reviewed and approved" />
        <StatCard label="Reconciled" value={reconciled} sub="Fully processed" />
      </div>

      {/* ── Filters + search ────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {/* Status filters */}
          {(['all', 'pending', 'confirmed', 'reconciled'] as const).map(s => (
            <FilterPill
              key={s}
              label={s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
            />
          ))}
          <div className="h-5 w-px bg-gray-200 self-center" />
          {/* Type filters */}
          {(['all', 'online', 'cash'] as const).map(t => (
            <FilterPill
              key={t}
              label={t === 'all' ? 'All types' : t.charAt(0).toUpperCase() + t.slice(1)}
              active={typeFilter === t}
              onClick={() => setTypeFilter(t)}
            />
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search donor or ref…"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-8 text-xs outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── List ────────────────────────────────────────── */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 py-14 text-center">
          <p className="text-sm font-medium text-gray-500">No donations found</p>
          {search && (
            <button onClick={() => setSearch('')}
              className="mt-2 text-xs text-violet-600 hover:underline">
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Table header — desktop only */}
          <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-gray-100 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-500 lg:grid">
            <span>Donor</span>
            <span>Channel</span>
            <span>Date</span>
            <span className="text-right">Amount</span>
          </div>

          {filtered.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setSelected(d)}
              className={cn(
                'w-full px-5 py-3.5 text-left transition-colors hover:bg-gray-50',
                i !== filtered.length - 1 && 'border-b border-gray-100'
              )}
            >
              {/* Mobile layout */}
              <div className="flex items-center justify-between gap-3 lg:hidden">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-1.5 w-1.5 shrink-0 rounded-full', STATUS_ACTIVE[d.status])} />
                    <p className="truncate text-sm font-medium text-gray-900">
                      {d.donor_name ?? 'Anonymous'}
                    </p>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {d.channel ? CHANNEL_LABELS[d.channel] ?? d.channel : 'Cash'} · {fmtDate(d.date)}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-gray-900">{fmt(d.amount)}</p>
                  <span className={cn('mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium capitalize', STATUS_STYLES[d.status])}>
                    {d.status}
                  </span>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden grid-cols-[1fr_auto_auto_auto] items-center gap-4 lg:grid">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-1.5 w-1.5 shrink-0 rounded-full', STATUS_ACTIVE[d.status])} />
                    <p className="truncate text-sm font-medium text-gray-900">
                      {d.donor_name ?? 'Anonymous'}
                    </p>
                    <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-medium capitalize', STATUS_STYLES[d.status])}>
                      {d.status}
                    </span>
                  </div>
                  {d.donor_email && (
                    <p className="ml-3.5 mt-0.5 truncate text-xs text-gray-500">{d.donor_email}</p>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {d.channel ? CHANNEL_LABELS[d.channel] ?? d.channel : 'Cash'}
                </span>
                <span className="text-xs text-gray-500">{fmtDate(d.date)}</span>
                <span className="text-sm font-bold text-gray-900">{fmt(d.amount)}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Add Cash Dialog ───────────────────────────── */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Add Cash donation</DialogTitle>
          </DialogHeader>
          <CashDonationForm onSuccess={fetchDonations} onClose={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>

      {/* ── Detail Dialog ────────────────────────────────── */}
      <Dialog open={!!selected} onOpenChange={v => !v && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Donation details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-5">
              {/* Amount hero */}
              <div className="rounded-xl bg-gray-50 px-5 py-4 text-center">
                <p className="text-3xl font-bold text-gray-900">{fmt(selected.amount)}</p>
                <p className="mt-1 text-xs text-gray-500">{fmtDate(selected.date)}</p>
                <span className={cn('mt-2 inline-block rounded-md px-3 py-0.5 text-xs font-medium capitalize', STATUS_STYLES[selected.status])}>
                  {selected.status}
                </span>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="mt-0.5 font-medium capitalize text-gray-800">{selected.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Channel</p>
                  <p className="mt-0.5 font-medium text-gray-800">
                    {selected.channel ? CHANNEL_LABELS[selected.channel] ?? selected.channel : 'Cash'}
                  </p>
                </div>
                {selected.donor_name && (
                  <div>
                    <p className="text-xs text-gray-500">Donor</p>
                    <p className="mt-0.5 font-medium text-gray-800">{selected.donor_name}</p>
                  </div>
                )}
                {selected.donor_email && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="mt-0.5 font-medium text-gray-800">{selected.donor_email}</p>
                  </div>
                )}
                {selected.reference && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Reference</p>
                    <p className="mt-0.5 font-mono text-xs text-gray-600">{selected.reference}</p>
                  </div>
                )}
                {selected.note && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Note</p>
                    <p className="mt-0.5 text-gray-800">{selected.note}</p>
                  </div>
                )}
              </div>

              {/* Status update */}
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Update status</p>
                <div className="flex gap-2">
                  {(['pending', 'confirmed', 'reconciled'] as const).map(s => (
                    <button
                      key={s}
                      disabled={selected.status === s || updating}
                      onClick={() => updateStatus(selected.id, s)}
                      className={cn(
                        'flex-1 rounded-lg px-3 py-2.5 text-xs font-medium capitalize transition-colors border',
                        selected.status === s
                          ? STATUS_STYLES[s]
                          : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-gray-100 disabled:opacity-40'
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
