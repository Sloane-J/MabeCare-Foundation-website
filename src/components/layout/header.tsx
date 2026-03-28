'use client'

import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import MenuDropdown from '@/components/blocks/menu-dropdown'
import type { NavigationSection } from '@/components/blocks/menu-navigation'
import MenuNavigation from '@/components/blocks/menu-navigation'
import ThemeToggle from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
  
  const activeSection = sectionIds.includes(detectedActiveSection)
    ? detectedActiveSection
    : ''

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
          // Transparent at top
          'bg-transparent': !isScrolled,

          // Translucent when scrolling (NO SHADOW)
          'bg-background/70 backdrop-blur-md': isScrolled,
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8'>

        {/* LEFT: Logo */}
        <a href='/#home' className='flex items-center gap-3 shrink-0 transition-opacity hover:opacity-90'>
          <div className="flex items-center justify-center">
            <img 
              src="/images/site-logo.png" 
              alt="MummyCare Foundation Logo" 
              className="h-10 w-auto object-contain" 
            />
          </div>
        
          <span className='text-[22px] font-bold tracking-tight text-foreground'>
            MummyCare <span className="text-primary">Foundation</span>
          </span>
        </a>

        {/* RIGHT SIDE (Nav + Actions pushed fully right) */}
                <div className="ml-auto flex items-center gap-6">
        
                  {/* Desktop Navigation (FAR RIGHT) */}
                  <div className="hidden lg:flex items-center">
                    <MenuNavigation
                      navigationData={navigationData}
                      activeSection={activeSection}
                      className={cn(
                        "flex items-center gap-2",
                      
                        // BASE: Spacing and Pill shape
                        "**:data-[slot=navigation-menu-link]:rounded-full",
                        "**:data-[slot=navigation-menu-link]:px-5",
                        "**:data-[slot=navigation-menu-link]:py-2",
                      
                        // Typography: Black and Normal weight
                        "**:data-[slot=navigation-menu-link]:text-sm",
                        "**:data-[slot=navigation-menu-link]:font-normal",
                        "**:data-[slot=navigation-menu-link]:text-foreground",
                      
                        // Transparent background (No tint)
                        "**:data-[slot=navigation-menu-link]:bg-transparent",
                      
                      )}
                    />
                  </div>

          {/* Actions */}
          <div className='flex items-center gap-2'>
            <ThemeToggle />

            {/* Desktop Donate */}
            <Button
              className='rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-semibold transition-transform hover:scale-105 active:scale-95 max-sm:hidden'
              asChild
            >
              <a href='#donate'>Donate</a>
            </Button>

            {/* Mobile Donate */}
            <div className="flex items-center sm:hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" className='rounded-full bg-primary text-white px-4' asChild>
                      <a href='#donate'>$</a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Donate</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Mobile Menu */}
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