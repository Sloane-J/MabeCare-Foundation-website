'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const BellIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
    <path d='M13.73 21a2 2 0 0 1-3.46 0' />
  </svg>
)

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='5' y='2' width='14' height='20' rx='2' ry='2' />
    <line x1='12' y1='18' x2='12.01' y2='18' />
  </svg>
)

const BankIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='3' y1='22' x2='21' y2='22' />
    <line x1='6' y1='18' x2='6' y2='11' />
    <line x1='10' y1='18' x2='10' y2='11' />
    <line x1='14' y1='18' x2='14' y2='11' />
    <line x1='18' y1='18' x2='18' y2='11' />
    <polygon points='12 2 20 7 4 7' />
  </svg>
)

const CardIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='1' y='4' width='22' height='16' rx='2' ry='2' />
    <line x1='1' y1='10' x2='23' y2='10' />
  </svg>
)

const GiftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='20 12 20 22 4 22 4 12' />
    <rect x='2' y='7' width='20' height='5' />
    <line x1='12' y1='22' x2='12' y2='7' />
    <path d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' />
    <path d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
    <circle cx='9' cy='7' r='4' />
    <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='5' y1='12' x2='19' y2='12' />
    <polyline points='12 5 19 12 12 19' />
  </svg>
)

type WayToHelp = {
  icon: React.ReactNode
  iconBg: string
  title: string
  description: string
  cta: string
  href: string
  badge?: string
}

const ways: WayToHelp[] = [
  {
    icon: <PhoneIcon className='size-4 text-emerald-600 dark:text-emerald-400' />,
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    title: 'Mobile Money',
    description:
      'Send a donation instantly via MTN MoMo, Telecel Cash, or AirtelTigo Money — the easiest way to give locally.',
    cta: 'Donate Now',
    href: '/donate',
    badge: 'Popular'
  },
  {
    icon: <CardIcon className='size-4 text-primary' />,
    iconBg: 'bg-primary/10 dark:bg-primary/20',
    title: 'Paystack Card Payment',
    description:
      'Pay securely with your Visa or Mastercard through Paystack — fast and convenient for local and international donors.',
    cta: 'Donate via Card',
    href: '/donate'
  },
  {
    icon: <BankIcon className='size-4 text-amber-600 dark:text-amber-400' />,
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    title: 'Direct Bank Transfer',
    description:
      'Transfer directly to our GCB, Absa, or Ecobank Ghana accounts for larger individual or corporate donations.',
    cta: 'Get Bank Details',
    href: '/donate'
  },
  {
    icon: <GiftIcon className='size-4 text-orange-600 dark:text-orange-400' />,
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/20',
    title: 'In-Kind Donations',
    description:
      'Donate food, clothing, educational supplies, or baby care items directly to mothers and infants in need.',
    cta: 'Arrange Drop-off',
    href: '/donate'
  },
  {
    icon: <UsersIcon className='size-4 text-blue-600 dark:text-blue-400' />,
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    title: 'Volunteer Your Time',
    description:
      'Offer your skills in teaching, healthcare, or community outreach. Your active presence changes lives.',
    cta: 'Get Involved',
    href: '/donate'
  },
  {
    icon: <BellIcon className='size-4 text-rose-600 dark:text-rose-400' />,
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    title: 'Diaspora Giving',
    description:
      'Ghanaians abroad can seamlessly send direct support via Paystack or international mobile top-up.',
    cta: 'Support From Abroad',
    href: '/donate'
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay
    }
  })
}

const WaysToHelpSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px'
  })

  return (
    <section
      id='ways-to-help'
      ref={sectionRef}
      className='overflow-hidden py-14 sm:py-20 lg:py-24'
    >
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>

        {/* Header */}
        <div className='mx-auto mb-10 flex max-w-2xl flex-col items-center space-y-3 text-center sm:mb-12'>
          <motion.div
            variants={fadeUp}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            <Badge
              variant='outline'
              className='gap-2 rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-medium text-primary'
            >
              <BellIcon className='size-3' />
              How You Can Help
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.1}
            className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl'
          >
            Ways You Can <span className='text-primary'>Make a Difference</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.2}
            className='max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base'
          >
            There are many ways to support mothers and children in Ghana. Find the method that works best for you and help us create lasting impact.
          </motion.p>
        </div>

        {/* Cards */}
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {ways.map((way, index) => (
            <motion.div
              key={way.title}
              variants={fadeUp}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.1 + index * 0.07}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className='group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md sm:p-5'
            >
              <div className='flex flex-col gap-3.5'>
                {/* Icon & Badge */}
                <div className='flex items-center justify-between'>
                  <div
                    className={`flex size-9 items-center justify-center rounded-lg ${way.iconBg}`}
                  >
                    {way.icon}
                  </div>

                  {way.badge && (
                    <span className='rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary'>
                      {way.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className='space-y-1.5'>
                  <h3 className='text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-base'>
                    {way.title}
                  </h3>

                  <p className='text-xs leading-relaxed text-muted-foreground sm:text-[13px]'>
                    {way.description}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className='mt-4 pt-1'>
                <Button
                  variant='outline'
                  className='group/btn h-9 w-full justify-between rounded-lg border-border/80 bg-background/50 px-3 text-xs font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground'
                  onClick={() => (window.location.href = way.href)}
                >
                  <span>{way.cta}</span>
                  <ArrowRightIcon className='size-3.5 transition-transform group-hover/btn:translate-x-1' />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WaysToHelpSection