import type { ReactNode } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

// Handles both same-page section scrolling and real page navigation
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  const isSectionAnchor = href.startsWith('#')

  if (!isSectionAnchor) {
    // Real route (e.g. /blog) — let the browser navigate normally
    return
  }

  e.preventDefault()
  const sectionId = href.replace('#', '')
  const isOnHomepage = window.location.pathname === '/'

  if (!isOnHomepage) {
    // Section lives on the homepage but we're on another page (e.g. /blog)
    window.location.href = `/${href}`
    return
  }

  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 56 // Updated to match shorter header height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

export type NavigationItem = {
  title: string
  href: string
}

export type NavigationSection = {
  title: string
  icon?: ReactNode
} & (
  | {
      items: NavigationItem[]
      href?: never
    }
  | {
      items?: never
      href: string
    }
)

type MenuNavigationProps = {
  navigationData: NavigationSection[]
  activeSection?: string
  className?: string
}

const MenuNavigation = ({ navigationData, activeSection, className }: MenuNavigationProps) => {
  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList className='flex-wrap justify-start gap-1'>
        {navigationData.map(navItem => {
          if (navItem.href) {
            const isSectionAnchor = navItem.href.startsWith('#')
            const sectionId = isSectionAnchor ? navItem.href.replace('#', '') : ''
            const isActive = isSectionAnchor && activeSection === sectionId && activeSection !== ''

            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={navItem.href}
                  onClick={e => handleNavClick(e, navItem.href!)}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent px-2.5 py-1 text-xs font-semibold transition-colors duration-200',
                    'hover:text-primary focus:text-primary',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }
          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger className='bg-transparent px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:text-primary focus:text-primary data-[state=open]:text-primary [&>svg]:size-3.5'>
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className='data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto'>
                <ul className='grid w-36 gap-2 p-1'>
                  <li>
                    {navItem.items?.map(item => (
                      <NavigationMenuLink key={item.title} href={item.href} className='px-2 py-1 text-xs font-semibold'>
                        {item.title}
                      </NavigationMenuLink>
                    ))}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuNavigation