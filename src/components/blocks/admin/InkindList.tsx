
import { useCallback, useEffect, useState } from 'react'
import { RefreshCw, Package, ExternalLink, Search, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type InkindSubmission = {
  id: string
  donor_name: string
  donor_email: string
  country: string | null
  item_description: string
  estimated_value: number | null
  photos: string
  message: string | null
  expected_ship_date: string | null
  status: 'submitted' | 'in_transit' | 'received'
  admin_note: string | null
  received_at: string | null
  created_at: string
}

const STATUS_STYLES = {
  submitted: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  in_transit: 'bg-blue-50 text-blue-700 border border-blue-200',
  received: 'bg-green-50 text-green-700 border border-green-200',
}

const STATUS_DOT = {
  submitted: 'bg-yellow-400',
  in_transit: 'bg-blue-400',
  received: 'bg-green-500',
}

const STATUS_LABELS = {
  submitted: 'Submitted',
  in_transit: 'In Transit',
  received: 'Received',
}

const STATUS_DESC = {
  submitted: 'Donor submitted, awaiting collection',
  in_transit: 'Items collected and on the way',
  received: 'Items received by MabEcare',
}

function fmt(v: number) {
  return `₵${Number(v).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function StatCard({ label, value, sub }: { label: string; value: number; sub: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{value}</p>
      <p className="mt-0.5 text-xs text-gray-400">{sub}</p>
    </div>
  )
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-violet-300 bg-violet-50 text-violet-700'
          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
      )}
    >
      {label}
    </button>
  )
}

function parsePhotos(raw: string): string[] {
  try { return JSON.parse(raw) ?? [] } catch { return [] }
}

export default function InkindList() {
  const [items, setItems] = useState<InkindSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<InkindSubmission | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState(false)
  const [adminNote, setAdminNote] = useState('')

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/inkind?${params}`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => { fetchItems() }, [fetchItems])

  async function updateStatus(id: string, status: string) {
    setUpdating(true)
    try {
      await fetch(`/api/inkind/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, admin_note: adminNote || undefined }),
      })
      await fetchItems()
      setSelected(prev => prev ? { ...prev, status: status as InkindSubmission['status'] } : null)
    } finally {
      setUpdating(false)
    }
  }

  const filtered = items.filter(item => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      item.donor_name.toLowerCase().includes(q) ||
      item.donor_email.toLowerCase().includes(q) ||
      item.item_description.toLowerCase().includes(q)
    )
  })

  // Stats from full unfiltered list
  const submitted = items.filter(i => i.status === 'submitted').length
  const inTransit = items.filter(i => i.status === 'in_transit').length
  const received = items.filter(i => i.status === 'received').length
  const totalValue = items.reduce((s, i) => s + (i.estimated_value ?? 0), 0)

  return (
    <div className="space-y-5 pb-10">

      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#111827', fontFamily: "'Merriweather', serif" }}>
            In-Kind Donations
          </h1>
          <p className="mt-0.5 text-sm text-gray-400">Physical item contributions to MabEcare</p>
        </div>
        <button
          onClick={fetchItems}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:text-gray-700"
          aria-label="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* ── Stat cards ──────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Est. total value</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-violet-600">{fmt(totalValue)}</p>
          <p className="mt-0.5 text-xs text-gray-400">{items.length} submission{items.length !== 1 ? 's' : ''}</p>
        </div>
        <StatCard label="Submitted" value={submitted} sub="Awaiting collection" />
        <StatCard label="In transit" value={inTransit} sub="On the way" />
        <StatCard label="Received" value={received} sub="Delivered to MabEcare" />
      </div>

      {/* ── Filters + search ────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['all', 'submitted', 'in_transit', 'received'] as const).map(s => (
            <FilterPill
              key={s}
              label={s === 'all' ? 'All' : STATUS_LABELS[s]}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
            />
          ))}
        </div>
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search donor or item…"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-8 text-xs outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── List ────────────────────────────────────────── */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 py-14 text-center">
          <Package className="mx-auto mb-2 h-8 w-8 text-gray-200" />
          <p className="text-sm font-medium text-gray-400">No submissions found</p>
          {search && (
            <button onClick={() => setSearch('')}
              className="mt-2 text-xs text-violet-600 hover:underline">
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Desktop header */}
          <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-gray-100 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-400 lg:grid">
            <span>Donor / Items</span>
            <span>Location</span>
            <span>Submitted</span>
            <span className="text-right">Est. Value</span>
          </div>

          {filtered.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setSelected(item); setAdminNote(item.admin_note ?? '') }}
              className={cn(
                'w-full px-5 py-3.5 text-left transition-colors hover:bg-gray-50',
                i !== filtered.length - 1 && 'border-b border-gray-100'
              )}
            >
              {/* Mobile */}
              <div className="flex items-start justify-between gap-3 lg:hidden">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-1.5 w-1.5 shrink-0 rounded-full', STATUS_DOT[item.status])} />
                    <p className="truncate text-sm font-medium text-gray-900">{item.donor_name}</p>
                  </div>
                  <p className="ml-3.5 mt-0.5 truncate text-xs text-gray-400">{item.item_description}</p>
                  <p className="ml-3.5 mt-0.5 text-xs text-gray-400">
                    {item.country ?? 'Unknown'} · {fmtDate(item.created_at)}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  {item.estimated_value ? (
                    <p className="text-sm font-bold text-gray-900">{fmt(item.estimated_value)}</p>
                  ) : (
                    <p className="text-xs text-gray-400">No value</p>
                  )}
                  <span className={cn('mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium', STATUS_STYLES[item.status])}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden grid-cols-[1fr_auto_auto_auto] items-center gap-4 lg:grid">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-1.5 w-1.5 shrink-0 rounded-full', STATUS_DOT[item.status])} />
                    <p className="truncate text-sm font-medium text-gray-900">{item.donor_name}</p>
                    <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-medium', STATUS_STYLES[item.status])}>
                      {STATUS_LABELS[item.status]}
                    </span>
                  </div>
                  <p className="ml-3.5 mt-0.5 truncate text-xs text-gray-400">{item.item_description}</p>
                </div>
                <span className="text-xs text-gray-500">{item.country ?? '—'}</span>
                <span className="text-xs text-gray-500">{fmtDate(item.created_at)}</span>
                <span className="text-sm font-bold text-gray-900">
                  {item.estimated_value ? fmt(item.estimated_value) : '—'}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Detail Dialog ────────────────────────────────── */}
      <Dialog open={!!selected} onOpenChange={v => !v && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">In-kind submission</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="max-h-[70vh] space-y-5 overflow-y-auto">

              {/* Hero */}
              <div className="rounded-xl bg-gray-50 px-5 py-4 text-center">
                <p className="text-lg font-bold text-gray-900">{selected.item_description}</p>
                {selected.estimated_value && (
                  <p className="mt-0.5 text-2xl font-bold text-violet-600">{fmt(selected.estimated_value)}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">{fmtDate(selected.created_at)}</p>
                <span className={cn('mt-2 inline-block rounded-md px-3 py-0.5 text-xs font-medium', STATUS_STYLES[selected.status])}>
                  {STATUS_LABELS[selected.status]}
                </span>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Donor</p>
                  <p className="mt-0.5 font-medium text-gray-800">{selected.donor_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Country</p>
                  <p className="mt-0.5 font-medium text-gray-800">{selected.country ?? '—'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="mt-0.5 font-medium text-gray-800">{selected.donor_email}</p>
                </div>
                {selected.expected_ship_date && (
                  <div>
                    <p className="text-xs text-gray-400">Expected ship date</p>
                    <p className="mt-0.5 font-medium text-gray-800">{fmtDate(selected.expected_ship_date)}</p>
                  </div>
                )}
                {selected.received_at && (
                  <div>
                    <p className="text-xs text-gray-400">Received at</p>
                    <p className="mt-0.5 font-medium text-gray-800">{fmtDate(selected.received_at)}</p>
                  </div>
                )}
                {selected.message && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Message from donor</p>
                    <p className="mt-0.5 italic text-gray-600">"{selected.message}"</p>
                  </div>
                )}
              </div>

              {/* Photos */}
              {parsePhotos(selected.photos).length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Photos</p>
                  <div className="grid grid-cols-3 gap-2">
                    {parsePhotos(selected.photos).map(url => (
                      <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                        className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img src={url} alt="" className="h-full w-full object-cover transition-opacity group-hover:opacity-80" />
                        <ExternalLink className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-white opacity-0 drop-shadow group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin note */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wide text-gray-400">Admin note</label>
                <textarea
                  value={adminNote}
                  onChange={e => setAdminNote(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 transition-colors"
                  placeholder="Add a note…"
                />
              </div>

              {/* Status update */}
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Update status</p>
                <div className="flex gap-2">
                  {(['submitted', 'in_transit', 'received'] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      disabled={selected.status === s || updating}
                      onClick={() => updateStatus(selected.id, s)}
                      className={cn(
                        'flex-1 rounded-lg border px-2 py-2.5 text-xs font-medium capitalize transition-colors',
                        selected.status === s
                          ? STATUS_STYLES[s]
                          : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-gray-100 disabled:opacity-40'
                      )}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  {STATUS_DESC[selected.status]}
                </p>
                {selected.status !== 'received' && (
                  <p className="text-xs text-gray-400">
                    Marking as <span className="font-medium text-green-700">Received</span> will send a confirmation email to the donor.
                  </p>
                )}
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
