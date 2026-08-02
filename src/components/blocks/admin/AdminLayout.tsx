import { useState } from 'react'
import {
  Home,
  Wallet,
  Package,
  BarChart3,
  LogOut,
  X,
  Download,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Home', href: '/admin/dashboard', icon: Home },
  { label: 'Financial Donations', href: '/admin/donations', icon: Wallet },
  { label: 'Material Donations', href: '/admin/inkind', icon: Package },
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
}: {
  item: NavItem
  active: boolean
  onClick?: () => void
}) {
  const Icon = item.icon
  return (
    <a
      href={item.href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 rounded-md px-3 py-3 text-sm transition-colors',
        active
          ? 'bg-violet-50 text-violet-700 font-medium'
          : 'text-gray-800 hover:bg-gray-100 hover:text-gray-800 font-normal'
      )}
    >
      <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-violet-600' : 'text-gray-800')} />
      <span>{item.label}</span>
    </a>
  )
}

const handleLogout = async () => {
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
  } finally {
    window.location.href = '/admin'
  }
}

export default function AdminLayout({
  children,
  currentPath,
}: {
  children: React.ReactNode
  currentPath: string
}) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Desktop Sidebar ─────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r border-gray-200 bg-white lg:flex">
        {/* Brand */}
        <div className="flex h-14 items-center gap-2 px-4 border-b border-gray-100">
          <div className="flex h-7 w-7 items-center justify-center">
            <img src='/images/site-logo.webp' loading="eager" alt='Logo' className='h-12 w-auto' width={32} height={32} />
          </div>
          <span className="text-sm font-semibold text-gray-800 " style={{ fontFamily: "'Merriweather', serif" }}>MabEcare Admin</span>
        </div>

        {/* Nav group */}
        <nav className="flex flex-1 flex-col gap-0.5 px-2 py-3">
          <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Overview
          </p>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.href}
              item={item}
              active={currentPath === item.href}
            />
          ))}
        </nav>

        <button
  id="pwa-install-btn"
  onClick={() => (window as any).installPWA?.()}
  style={{ display: 'none' }}
  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
>
  <Download className="h-5 w-5" />
  <span>Install App</span>
</button>

        {/* Logout */}
        <div className="border-t border-gray-100 px-2 py-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-gray-800 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Drawer (no hamburger — triggered via bottom nav if needed) ── */}
      {/* Bottom nav handles mobile navigation — no header needed */}

      {/* ── Bottom Nav (Mobile only) ─────────────────── */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-gray-200 bg-white lg:hidden">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          const active = currentPath === item.href
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-[11px] font-medium transition-colors',
                active ? 'text-violet-600' : 'text-gray-800'
              )}
            >
              <Icon className={cn('h-5 w-5', active && 'stroke-[2.5px]')} />
              <span>{item.label}</span>
            </a>
          )
        })}
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-2 text-[11px] font-medium text-gray-800 hover:text-red-500"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>

      {/* ── Main Content ─────────────────────────────── */}
      <main className={cn('min-h-screen', 'pb-20 lg:pb-0', 'lg:pl-56')}>
        <div className="mx-auto max-w-5xl p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
