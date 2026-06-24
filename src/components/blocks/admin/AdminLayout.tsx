import { useState } from 'react'
import {
  LayoutDashboard,
  Wallet,
  Package,
  BarChart3,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Donations', href: '/admin/donations', icon: Wallet },
  { label: 'In-Kind', href: '/admin/inkind', icon: Package },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
]
type NavItem = {
  label: string
  href: string
  icon: React.ElementType
}

function NavLink({
  item,
  active,
  onClick,
  collapsed,
}: {
  item: NavItem
  active: boolean
  onClick?: () => void
  collapsed?: boolean
}) {
  const Icon = item.icon

  return (
    <a
      href={item.href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-accent text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </a>
  )
}
async function handleLogout() {
  await fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/admin'
}

export default function AdminLayout({
  children,
  currentPath,
}: {
  children: React.ReactNode
  currentPath: string
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* ── Desktop Sidebar ─────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-border bg-card lg:flex">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <div className="h-7 w-7 rounded-full bg-primary" />
          <span className="font-semibold text-foreground">MabEcare Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.href}
              item={item}
              active={currentPath === item.href}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary" />
          <span className="font-semibold text-foreground">MabEcare Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* ── Mobile Drawer ────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute inset-y-0 left-0 w-72 flex-col bg-card shadow-lg flex">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary" />
                <span className="font-semibold">MabEcare Admin</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-3">
              {NAV_ITEMS.map(item => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={currentPath === item.href}
                  onClick={() => setSidebarOpen(false)}
                />
              ))}
            </nav>
            <div className="border-t border-border p-3">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Bottom Nav (Mobile) ──────────────────────── */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-border bg-card lg:hidden">
        {NAV_ITEMS.map(item => {
  const Icon = item.icon
  const active = currentPath === item.href

  return (
    <a
      key={item.href}
      href={item.href}
      className={cn(
        'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
        active ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      <Icon className={cn('h-5 w-5', active && 'stroke-[2.5px]')} />
      <span>{item.label}</span>
    </a>
  )
})}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>

      {/* ── Main Content ─────────────────────────────── */}
      <main
        className={cn(
          'min-h-screen',
          'pt-14 pb-20 lg:pt-0 lg:pb-0', // account for mobile header + bottom nav
          'lg:pl-60' // account for desktop sidebar
        )}
      >
        <div className="mx-auto max-w-5xl p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
