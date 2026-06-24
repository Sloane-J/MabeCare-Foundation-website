import { useCallback, useEffect, useState } from 'react'
import { RefreshCw, Package, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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

const STATUS_COLORS = {
  submitted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  in_transit: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  received: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
}

const STATUS_LABELS = {
  submitted: 'Submitted',
  in_transit: 'In Transit',
  received: 'Received'
}

export default function InkindList() {
  const [items, setItems] = useState<InkindSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<InkindSubmission | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
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

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  async function updateStatus(id: string, status: string) {
    setUpdating(true)
    try {
      await fetch(`/api/inkind/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          admin_note: adminNote || undefined
        })
      })
      await fetchItems()
      setSelected(prev => (prev ? { ...prev, status: status as InkindSubmission['status'] } : null))
    } finally {
      setUpdating(false)
    }
  }

  const photos = (submission: InkindSubmission): string[] => {
    try {
      return JSON.parse(submission.photos) ?? []
    } catch {
      return []
    }
  }

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-bold lg:text-2xl'>In-Kind Donations</h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            {items.length} submission{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button variant='outline' size='sm' onClick={fetchItems} className='h-9 w-9 p-0' aria-label='Refresh'>
          <RefreshCw className='h-4 w-4' />
        </Button>
      </div>

      {/* Filter */}
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className='h-9 w-40 text-xs'>
          <SelectValue placeholder='Filter by status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All statuses</SelectItem>
          <SelectItem value='submitted'>Submitted</SelectItem>
          <SelectItem value='in_transit'>In Transit</SelectItem>
          <SelectItem value='received'>Received</SelectItem>
        </SelectContent>
      </Select>

      {/* List */}
      {loading ? (
        <div className='space-y-3'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='bg-muted h-24 animate-pulse rounded-lg' />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className='border-border rounded-lg border border-dashed py-12 text-center'>
          <Package className='text-muted-foreground/50 mx-auto mb-2 h-8 w-8' />
          <p className='text-muted-foreground text-sm'>No submissions found</p>
        </div>
      ) : (
        <div className='space-y-2'>
          {items.map(item => (
            <button
              key={item.id}
              type='button'
              onClick={() => {
                setSelected(item)
                setAdminNote(item.admin_note ?? '')
              }}
              className='border-border bg-card hover:bg-muted/50 w-full rounded-lg border p-4 text-left transition-colors'
            >
              <div className='flex items-start justify-between gap-2'>
                <div className='min-w-0'>
                  <p className='truncate text-sm font-medium'>{item.donor_name}</p>
                  <p className='text-muted-foreground mt-0.5 truncate text-xs'>{item.item_description}</p>
                  <p className='text-muted-foreground mt-1 text-xs'>
                    {item.country ?? 'Unknown location'} · {new Date(item.created_at).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <div className='flex shrink-0 flex-col items-end gap-1.5'>
                  {item.estimated_value && (
                    <span className='text-primary text-sm font-bold'>
                      ₵{Number(item.estimated_value).toLocaleString('en-GH')}
                    </span>
                  )}
                  <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', STATUS_COLORS[item.status])}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={v => !v && setSelected(null)}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>In-Kind Submission</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className='max-h-[70vh] space-y-4 overflow-y-auto'>
              {/* Donor Info */}
              <div className='grid grid-cols-2 gap-3 text-sm'>
                <div>
                  <p className='text-muted-foreground text-xs'>Donor</p>
                  <p className='font-medium'>{selected.donor_name}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-xs'>Country</p>
                  <p className='font-medium'>{selected.country ?? '—'}</p>
                </div>
                <div className='col-span-2'>
                  <p className='text-muted-foreground text-xs'>Email</p>
                  <p className='font-medium'>{selected.donor_email}</p>
                </div>
                <div className='col-span-2'>
                  <p className='text-muted-foreground text-xs'>Items</p>
                  <p>{selected.item_description}</p>
                </div>
                {selected.estimated_value && (
                  <div>
                    <p className='text-muted-foreground text-xs'>Est. Value</p>
                    <p className='text-primary font-bold'>
                      ₵{Number(selected.estimated_value).toLocaleString('en-GH')}
                    </p>
                  </div>
                )}
                {selected.expected_ship_date && (
                  <div>
                    <p className='text-muted-foreground text-xs'>Expected Ship</p>
                    <p>{new Date(selected.expected_ship_date).toLocaleDateString('en-GB')}</p>
                  </div>
                )}
                {selected.message && (
                  <div className='col-span-2'>
                    <p className='text-muted-foreground text-xs'>Message</p>
                    <p className='text-muted-foreground italic'>"{selected.message}"</p>
                  </div>
                )}
              </div>

              {/* Photos */}
              {photos(selected).length > 0 && (
                <div>
                  <p className='text-muted-foreground mb-2 text-xs'>Photos</p>
                  <div className='grid grid-cols-3 gap-2'>
                    {photos(selected).map(url => (
                      <a
                        key={url}
                        href={url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group bg-muted relative aspect-square overflow-hidden rounded-lg'
                      >
                        <img
                          src={url}
                          alt={url.split('/').pop() ?? 'Donation photo'}
                          className='h-full w-full object-cover transition-opacity group-hover:opacity-80'
                        />
                        <ExternalLink className='absolute top-1.5 right-1.5 h-3.5 w-3.5 text-white opacity-0 drop-shadow group-hover:opacity-100' />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Note */}
              <div className='space-y-1.5'>
                <label htmlFor='admin-note' className='text-muted-foreground text-xs font-medium'>
                  Admin Note
                </label>

                <textarea
                  id='admin-note'
                  value={adminNote}
                  onChange={e => setAdminNote(e.target.value)}
                  rows={2}
                  className='border-border bg-input focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2'
                  placeholder='Add a note...'
                />
              </div>

              {/* Status Update */}
              <div className='border-border space-y-2 border-t pt-4'>
                <p className='text-sm font-medium'>Update Status</p>
                <div className='flex gap-2'>
                  {(['submitted', 'in_transit', 'received'] as const).map(s => (
                    <button
                      key={s}
                      type='button'
                      disabled={selected.status === s || updating}
                      onClick={() => updateStatus(selected.id, s)}
                      className={cn(
                        'flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors',
                        selected.status === s ? STATUS_COLORS[s] : 'bg-muted text-muted-foreground hover:bg-muted/70'
                      )}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
                {selected.status !== 'received' && (
                  <p className='text-muted-foreground text-xs'>
                    Marking as <strong>Received</strong> will send a confirmation email to the donor.
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
