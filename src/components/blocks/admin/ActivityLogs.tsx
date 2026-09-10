import { Activity, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'

type LogEntry = {
  id: string
  admin_email: string
  action: string
  details: string | null
  ip_address: string | null
  created_at: string
}

const ACTION_LABELS: Record<string, string> = {
  login: 'Logged in',
  donation_status_update: 'Updated donation',
  inkind_status_update: 'Updated in-kind',
  password_change: 'Changed password',
  email_change: 'Changed email',
}

const ACTION_COLORS: Record<string, string> = {
  login: '#3B82F6',
  donation_status_update: '#6A1B9A',
  inkind_status_update: '#10B981',
  password_change: '#F59E0B',
  email_change: '#F59E0B',
}

export default function ActivityLogs() {
  const [logs, setLogs]     = useState<LogEntry[]>([])
  const [total, setTotal]   = useState(0)
  const [page, setPage]     = useState(1)
  const [loading, setLoading] = useState(true)
  const pageSize = 20

  async function fetchLogs() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/activity-logs?page=${page}&pageSize=${pageSize}`)
      const data = await res.json()
      setLogs(data.logs ?? [])
      setTotal(data.total ?? 0)
    } catch {
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLogs() }, [page])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  function fmtDate(iso: string) {
    return new Date(iso).toLocaleString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, fontFamily: "'Merriweather', serif", color: '#111827' }}>
            Activity Logs
          </h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 3 }}>
            Admin actions — automatically cleared after 90 days
          </p>
        </div>
        <button onClick={fetchLogs} style={{
          width: 36, height: 36, border: '1px solid #EAEAEA', borderRadius: 8,
          background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF',
        }}>
          <RefreshCw style={{ width: 14, height: 14 }} />
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ height: 56, borderRadius: 10, background: '#F3F4F6' }} className="logs-skeleton" />
          ))}
        </div>
      ) : logs.length === 0 ? (
        <div style={{
          border: '1px dashed #E5E7EB', borderRadius: 12, padding: '48px 24px',
          textAlign: 'center',
        }}>
          <Activity style={{ width: 28, height: 28, color: '#D1D5DB', margin: '0 auto 10px' }} />
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>No activity recorded yet</p>
        </div>
      ) : (
        <>
          <div style={{ border: '1px solid #EAEAEA', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
            {logs.map((log, i) => (
              <div key={log.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 18px',
                borderBottom: i < logs.length - 1 ? '1px solid #F3F4F6' : 'none',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: ACTION_COLORS[log.action] ?? '#9CA3AF',
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>
                    {ACTION_LABELS[log.action] ?? log.action}
                  </p>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '2px 0 0' }}>
                    {log.admin_email}
                    {log.details && ` · ${log.details}`}
                  </p>
                </div>
                <span style={{ fontSize: 11, color: '#9CA3AF', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {fmtDate(log.created_at)}
                </span>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>
              Page {page} of {totalPages} · {total} total
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: '1px solid #EAEAEA',
                  background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1,
                }}
              >
                <ChevronLeft style={{ width: 14, height: 14 }} />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: '1px solid #EAEAEA',
                  background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1,
                }}
              >
                <ChevronRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .logs-skeleton { animation: logs-pulse 1.5s ease-in-out infinite; }
        @keyframes logs-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  )
}