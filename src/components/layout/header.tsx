'use client'

import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const navLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Programmes', href: '#donation-programmes' },
  { label: 'Impact', href: '#impact-metrics' },
  { label: 'Contact', href: '#contact' },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    
    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''))
    
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            b.intersectionRatio > a.intersectionRatio ? b : a
          )
          
          setActiveSection(top.target.id)
        }
      },
      { threshold: [0.1, 0.5], rootMargin: '-80px 0px -50% 0px' }
    )

    ids.forEach(id => {
      const el = document.getElementById(id)
      
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 h-20 w-full transition-all duration-500',
          isScrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border/40 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <a href="/#home" className="flex items-center gap-3 shrink-0">
            <img
              src="/images/site-logo.png"
              alt="MabeCare Foundation Logo"
              className="h-9 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-sm sm:text-base font-bold tracking-widest uppercase text-foreground">
                MabeCare
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary font-medium">
                Foundation
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace('#', '')
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm',
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button
              className="hidden sm:flex rounded-full px-6 bg-primary hover:bg-primary/90 text-white text-sm font-semibold"
              asChild
            >
              <a href="#donate">Donate</a>
            </Button>

            {/* Mobile toggle */}
            <button
              type='button'
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {mobileOpen
                ? <CloseIcon className="size-5" />
                : <MenuIcon className="size-5" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed inset-0 z-40 bg-background flex flex-col pt-20 px-6 pb-8 transition-all duration-300 lg:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col gap-1 mt-6" aria-label="Mobile navigation">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'text-2xl font-semibold py-3 border-b border-border/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive ? 'text-primary' : 'text-foreground'
                )}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="mt-auto">
          <Button
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-semibold py-5 text-base"
            asChild
          >
            <a href="#donate" onClick={() => setMobileOpen(false)}>
              Donate Now
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Header