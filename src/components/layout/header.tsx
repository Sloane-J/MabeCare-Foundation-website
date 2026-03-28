'use client'

import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import MenuDropdown from '@/components/blocks/menu-dropdown'
import type { NavigationSection } from '@/components/blocks/menu-navigation'
import MenuNavigation from '@/components/blocks/menu-navigation'
import ThemeToggle from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Hook to track active section
const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length === 0) {
          setActiveSection('')
        } else {
          const mostVisible = visible.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          )
          setActiveSection(mostVisible.target.id)
        }
      },
      { threshold: [0.1, 0.5], rootMargin: '-80px 0px -50% 0px' }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}

type HeaderProps = {
  navigationData: NavigationSection[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  const sectionIds = navigationData
    .map(item => item.href?.replace('#', ''))
    .filter(Boolean) as string[]

  const detectedActiveSection = useActiveSection(sectionIds)
  const activeSection = sectionIds.includes(detectedActiveSection) ? detectedActiveSection : ''

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 h-20 w-full transition-all duration-500 ease-in-out',
        {
          'bg-transparent': !isScrolled,
          'bg-background/80 backdrop-blur-md border-b border-border/40': isScrolled,
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        
        {/* LEFT: Logo & Brand */}
        <a href='/#home' className='flex items-center gap-2 shrink-0 transition-opacity hover:opacity-90'>
          <img 
            src="/images/site-logo.png" 
            alt="MummyCare Logo" 
            className="h-8 w-auto sm:h-10 object-contain" 
          />
          {/* text-[16px] ensures "Foundation" stays visible and fits on mobile screens */}
          <span className='text-[16px] sm:text-[22px] font-bold tracking-tight text-foreground whitespace-nowrap'>
            MummyCare <span className="text-primary inline">Foundation</span>
          </span>
        </a>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center mr-4">
            <MenuNavigation
              navigationData={navigationData}
              activeSection={activeSection}
              className={cn(
                "flex items-center gap-1",
                "**:data-[slot=navigation-menu-link]:rounded-full",
                "**:data-[slot=navigation-menu-link]:px-4",
                "**:data-[slot=navigation-menu-link]:py-2",
                "**:data-[slot=navigation-menu-link]:text-sm",
                "**:data-[slot=navigation-menu-link]:font-normal",
                "**:data-[slot=navigation-menu-link]:text-foreground",
                "**:data-[slot=navigation-menu-link]:bg-transparent",
                "hover:**:data-[slot=navigation-menu-link]:text-primary",
                "**:data-[active=true]:text-primary **:data-[active=true]:font-medium"
              )}
            />
          </div>

          {/* Actions Container */}
          <div className='flex items-center gap-1 sm:gap-2'>
            <ThemeToggle />

            {/* Donate Button: Shown from 'sm' (640px) and up to save mobile space */}
            <Button
              className='hidden sm:flex rounded-full px-5 bg-primary hover:bg-primary/90 text-white font-semibold'
              asChild
            >
              <a href='#donate'>Donate</a>
            </Button>

            {/* Mobile Menu Toggle */}
            <MenuDropdown
              align='end'
              navigationData={navigationData}
              activeSection={activeSection}
              trigger={
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full lg:hidden hover:bg-primary/10 hover:text-primary'
                >
                  <MenuIcon className="h-6 w-6" />
                  <span className='sr-only'>Menu</span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header