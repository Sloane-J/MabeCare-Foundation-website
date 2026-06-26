'use client'

import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <line x1='3' y1='6' x2='21' y2='6' />
    <line x1='3' y1='12' x2='21' y2='12' />
    <line x1='3' y1='18' x2='21' y2='18' />
  </svg>
)

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <line x1='18' y1='6' x2='6' y2='18' />
    <line x1='6' y1='6' x2='18' y2='18' />
  </svg>
)

const homeNavLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Programmes', href: '#donation-programmes' },
  { label: 'Impact', href: '#impact-metrics' },
  { label: 'Contact', href: '/contact-us' }
]

const aboutNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Programmes', href: '/#donation-programmes' },
  { label: 'Impact', href: '/#impact-metrics' },
  { label: 'Contact', href: '/#contact-us' }
]

const contactNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Programmes', href: '/#donation-programmes' },
  { label: 'Impact', href: '/#impact-metrics' }
]

type HeaderProps = {
  pathname: string
}

const Header = ({ pathname }: HeaderProps) => {
  const isAbout = pathname === '/about-us'
  const isContact = pathname === '/contact-us'
  const navLinks = isContact ? contactNavLinks : isAbout ? aboutNavLinks : homeNavLinks

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const anchorLinks = navLinks.filter(l => l.href.startsWith('#'))
    const ids = anchorLinks.map(l => l.href.replace('#', ''))

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)

        if (visible.length > 0) {
          const top = visible.reduce((a, b) => (b.intersectionRatio > a.intersectionRatio ? b : a))

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
  }, [navLinks])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isLinkActive = (href: string) => {
    if (href.startsWith('#')) return activeSection === href.replace('#', '')
    if (href === '/about-us') return pathname === '/about-us'
    if (href === '/') return pathname === '/'

    return false
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 h-20 w-full transition-all duration-500',
          isScrolled ? 'bg-background/90 border-border/40 border-b shadow-sm backdrop-blur-md' : 'bg-transparent'
        )}
      >
        <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
          {/* Logo */}
          <a
            href='/'
            className='focus-visible:ring-primary flex shrink-0 items-center gap-3 rounded-sm focus:outline-none focus-visible:ring-2'
            aria-label='MabEcare Foundation home'
          >
            <img
              src='/images/site-logo.png'
              alt='MabEcare Foundation Logo'
              className='h-12 w-auto object-contain'
              width={36}
              height={36}
            />
            <div className='flex flex-col leading-none'>
              <span className='text-foreground text-sm font-bold tracking-widest uppercase sm:text-base'>MabEcare</span>
              <span className='text-primary text-[10px] font-medium tracking-[0.2em] uppercase sm:text-xs'>
                Foundation
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className='hidden items-center gap-8 lg:flex' aria-label='Main navigation'>
            {navLinks.map(link => {
              const isActive = isLinkActive(link.href)

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'focus-visible:ring-primary rounded-sm text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2',
                    isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className='flex items-center gap-2'>
            <ThemeToggle />

            <Button
              className='bg-primary hover:bg-primary/90 hidden rounded-full px-6 text-sm font-semibold text-white sm:flex'
              asChild
            >
              <a href='/donate'>Donate</a>
            </Button>

            <button
              type='button'
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls='mobile-menu'
              className='text-foreground hover:text-primary focus-visible:ring-primary flex h-9 w-9 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 lg:hidden'
            >
              {mobileOpen ? <CloseIcon className='size-5' /> : <MenuIcon className='size-5' />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id='mobile-menu'
        role='dialog'
        aria-modal='true'
        aria-label='Mobile navigation menu'
        className={cn(
          'bg-background fixed inset-0 z-40 flex flex-col px-6 pt-20 pb-8 transition-all duration-300 lg:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <nav className='mt-6 flex flex-col gap-1' aria-label='Mobile navigation'>
          {navLinks.map(link => {
            const isActive = isLinkActive(link.href)

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'border-border/40 focus-visible:ring-primary border-b py-4 text-2xl font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2',
                  isActive ? 'text-primary' : 'text-foreground'
                )}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className='mt-auto'>
          <Button
            className='bg-primary hover:bg-primary/90 w-full rounded-full py-5 text-base font-semibold text-white'
            asChild
          >
            <a href='/donate' onClick={() => setMobileOpen(false)}>
              Donate Now
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Header
