'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

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

const BookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
    <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
  </svg>
)

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }
  })
}

const fadeIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay }
  })
}

const ResultsSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id='our-results' ref={sectionRef} className='py-12 sm:py-20 lg:py-28 overflow-hidden'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        
        {/* Header */}
        <div className='mx-auto mb-10 flex max-w-2xl flex-col items-center text-center sm:mb-14 space-y-3'>
          <motion.div variants={fadeUp} initial='hidden' animate={isInView ? 'visible' : 'hidden'} custom={0}>
            <Badge variant='outline' className='gap-2 rounded-full border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary'>
              <BellIcon className='size-3.5' />
              Our Impact
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.1}
            className='text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-foreground'
          >
            Impact That <span className='text-primary'>Matters</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.2}
            className='text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed'
          >
            Real progress measured across mothers and children in Ghana.
          </motion.p>
        </div>

        {/* Content Body */}
        <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'>
          
          {/* Left: Image & Floating Chart Card */}
          <motion.div
            className='relative mx-auto w-full max-w-lg lg:max-w-none'
            variants={fadeIn}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.15}
          >
            <div className='overflow-hidden rounded-3xl border border-border/80 bg-card shadow-md'>
              <img
                src='/images/woman-working.webp'
                alt='A working mother in Ghana'
                loading='lazy'
                className='h-[360px] w-full object-cover sm:h-[460px] brightness-[0.98]'
              />
            </div>

            {/* Floating Donation Chart Card */}
            <motion.div
              className='absolute -bottom-4 right-2 sm:-right-4 sm:bottom-6 w-48 sm:w-56 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-md p-4 shadow-xl'
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              <p className='text-foreground text-xs sm:text-sm font-semibold'>Annual Growth</p>
              <p className='text-muted-foreground text-[11px] mb-3'>Donations & support over time</p>

              <div className='flex h-14 items-end gap-1.5'>
                {[40, 55, 65, 80, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${height}%` } : { height: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeOut',
                      delay: 0.5 + i * 0.08
                    }}
                    className={`flex-1 rounded-t-sm transition-colors ${
                      i === 4 ? 'bg-primary' : 'bg-emerald-500/80 dark:bg-emerald-400/80'
                    }`}
                  />
                ))}
              </div>

              <div className='mt-2 flex gap-1 text-[10px] text-muted-foreground'>
                {['2020', '2021', '2022', '2023', '2024'].map(year => (
                  <span key={year} className='flex-1 text-center font-mono'>
                    {year}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Copywriting & Key Metrics */}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3 text-left'>
              <motion.div variants={fadeUp} initial='hidden' animate={isInView ? 'visible' : 'hidden'} custom={0.25}>
                <Badge variant='outline' className='w-fit rounded-full border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground'>
                  Welfare & Skills
                </Badge>
              </motion.div>

              <motion.h3
                variants={fadeUp}
                initial='hidden'
                animate={isInView ? 'visible' : 'hidden'}
                custom={0.3}
                className='text-xl sm:text-3xl font-semibold tracking-tight text-foreground leading-snug'
              >
                Empowering Local Mothers
              </motion.h3>

              <motion.p
                variants={fadeUp}
                initial='hidden'
                animate={isInView ? 'visible' : 'hidden'}
                custom={0.35}
                className='text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md'
              >
                Practical vocational training and direct welfare support helping mothers earn income and secure their children&apos;s futures.
              </motion.p>
            </div>

            {/* Stat Cards */}
            <div className='grid grid-cols-2 gap-3 sm:gap-4 pt-2'>
              {[
                {
                  icon: <UsersIcon className='size-4 text-emerald-600 dark:text-emerald-400' />,
                  bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
                  label: 'Mothers Supported',
                  value: '200+',
                  delay: 0.4
                },
                {
                  icon: <BookIcon className='size-4 text-amber-600 dark:text-amber-400' />,
                  bg: 'bg-amber-500/10 dark:bg-amber-500/20',
                  label: 'Women in Training',
                  value: '150+',
                  delay: 0.45
                }
              ].map(({ icon, bg, label, value, delay }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  initial='hidden'
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={delay}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className='border-border/80 bg-card flex flex-col gap-2 rounded-2xl border p-4 sm:p-5 shadow-sm hover:border-primary/30 transition-all'
                >
                  <div className={`flex size-8 sm:size-9 items-center justify-center rounded-xl ${bg}`}>
                    {icon}
                  </div>
                  <div>
                    <p className='text-foreground text-2xl sm:text-3xl font-semibold tracking-tight'>{value}</p>
                    <p className='text-muted-foreground text-xs sm:text-sm font-medium mt-0.5'>{label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ResultsSection