import { useState } from 'react'
import { Mail, Lock, ShieldCheck, Loader2 } from 'lucide-react'

export default function ProfileSettings({ currentEmail }: { currentEmail: string }) {
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword]         = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwLoading, setPwLoading]             = useState(false)
  const [pwMessage, setPwMessage]             = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Email change state
  const [newEmail, setNewEmail]                 = useState('')
  const [emailPassword, setEmailPassword]       = useState('')
  const [emailLoading, setEmailLoading]         = useState(false)
  const [emailMessage, setEmailMessage]         = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setPwMessage(null)

    if (newPassword !== confirmPassword) {
      setPwMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    setPwLoading(true)
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setPwMessage({ type: 'success', text: 'Password updated successfully' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (e: any) {
      setPwMessage({ type: 'error', text: e.message ?? 'Failed to update password' })
    } finally {
      setPwLoading(false)
    }
  }

  async function handleEmailChange(e: React.FormEvent) {
    e.preventDefault()
    setEmailMessage(null)
    setEmailLoading(true)

    try {
      const res = await fetch('/api/auth/request-email-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_email: newEmail, current_password: emailPassword }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setEmailMessage({
        type: 'success',
        text: `A confirmation link has been sent to ${newEmail}. Your email won't change until you click that link.`,
      })
      setNewEmail('')
      setEmailPassword('')
    } catch (e: any) {
      setEmailMessage({ type: 'error', text: e.message ?? 'Failed to request email change' })
    } finally {
      setEmailLoading(false)
    }
  }

  const card: React.CSSProperties = {
    background: '#fff', border: '1px solid #EAEAEA', borderRadius: 12, padding: 24,
  }
  const label: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }
  const input: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #E5E7EB',
    fontSize: 13, outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", maxWidth: 560 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, fontFamily: "'Merriweather', serif", color: '#111827' }}>
          Profile Settings
        </h1>
        <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 3 }}>
          Manage your account email and password
        </p>
      </div>

      {/* Current account info */}
      <div style={{ ...card, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: '#F5F0FA',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <ShieldCheck style={{ width: 18, height: 18, color: '#6A1B9A' }} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0 }}>Signed in as</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: '2px 0 0' }}>{currentEmail}</p>
        </div>
      </div>

      {/* Change email */}
      <form onSubmit={handleEmailChange} style={{ ...card, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Mail style={{ width: 16, height: 16, color: '#6A1B9A' }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Change Email</span>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={label}>New email address</label>
          <input
            type="email" required value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            placeholder="new-email@example.com"
            style={input}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={label}>Confirm with current password</label>
          <input
            type="password" required value={emailPassword}
            onChange={e => setEmailPassword(e.target.value)}
            placeholder="••••••••"
            style={input}
          />
        </div>

        {emailMessage && (
          <div style={{
            padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13,
            background: emailMessage.type === 'success' ? '#F0FDF4' : '#FEF2F2',
            color: emailMessage.type === 'success' ? '#166534' : '#B91C1C',
          }}>
            {emailMessage.text}
          </div>
        )}

        <button type="submit" disabled={emailLoading} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 20px', borderRadius: 8, border: 'none',
          background: '#6A1B9A', color: '#fff', fontSize: 13, fontWeight: 600,
          cursor: emailLoading ? 'not-allowed' : 'pointer', opacity: emailLoading ? 0.6 : 1,
        }}>
          {emailLoading && <Loader2 style={{ width: 14, height: 14, animation: 'spin 1s linear infinite' }} />}
          {emailLoading ? 'Sending…' : 'Send Confirmation Link'}
        </button>

        <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 10 }}>
          A confirmation link will be sent to the new address. Your email stays the same until you click it.
        </p>
      </form>

      {/* Change password */}
      <form onSubmit={handlePasswordChange} style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Lock style={{ width: 16, height: 16, color: '#6A1B9A' }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Change Password</span>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={label}>Current password</label>
          <input
            type="password" required value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            style={input}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={label}>New password</label>
          <input
            type="password" required minLength={8} value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="At least 8 characters"
            style={input}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={label}>Confirm new password</label>
          <input
            type="password" required minLength={8} value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            style={input}
          />
        </div>

        {pwMessage && (
          <div style={{
            padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13,
            background: pwMessage.type === 'success' ? '#F0FDF4' : '#FEF2F2',
            color: pwMessage.type === 'success' ? '#166534' : '#B91C1C',
          }}>
            {pwMessage.text}
          </div>
        )}

        <button type="submit" disabled={pwLoading} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 20px', borderRadius: 8, border: 'none',
          background: '#6A1B9A', color: '#fff', fontSize: 13, fontWeight: 600,
          cursor: pwLoading ? 'not-allowed' : 'pointer', opacity: pwLoading ? 0.6 : 1,
        }}>
          {pwLoading && <Loader2 style={{ width: 14, height: 14, animation: 'spin 1s linear infinite' }} />}
          {pwLoading ? 'Updating…' : 'Update Password'}
        </button>
      </form>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}