'use client'

import { Badge } from '@/components/ui/badge'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const BellIcon = ({ className, 'aria-label': ariaLabel }: { className?: string; 'aria-label'?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-label={ariaLabel || 'Bell icon'}
  >
    <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
    <path d='M13.73 21a2 2 0 0 1-3.46 0' />
  </svg>
)

const UsersIcon = ({ className, 'aria-label': ariaLabel }: { className?: string; 'aria-label'?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-label={ariaLabel || 'Users icon'}
  >
    <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
    <circle cx='9' cy='7' r='4' />
    <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
  </svg>
)

const BookIcon = ({ className, 'aria-label': ariaLabel }: { className?: string; 'aria-label'?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-label={ariaLabel || 'Book icon'}
  >
    <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
    <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
  </svg>
)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
  })
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay }
  })
}

const ResultsSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id='our-results' ref={sectionRef} className='py-12 sm:py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16'>
          <motion.div variants={fadeUp} initial='hidden' animate={isInView ? 'visible' : 'hidden'} custom={0}>
            <Badge variant='outline' className='gap-2 px-4 py-1.5 text-sm font-normal'>
              <BellIcon className='text-primary size-4' />
              Our results
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.1}
            className='text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl'
          >
            Results that <span className='text-primary'>inspire</span> change
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.2}
            className='text-muted-foreground max-w-xl text-base sm:text-lg'
          >
            Every step we take is measured by the real difference we make in the lives of mothers and children across
            Ghana.
          </motion.p>
        </div>

        {/* Body */}
        <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'>
          {/* Left — image with floating chart card */}
          <motion.div
            className='relative'
            variants={fadeIn}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.15}
          >
            <motion.div
              className='overflow-hidden rounded-3xl'
              initial={{ scale: 0.97, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <img
                src='https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&q=80'
                alt='MabEcare volunteers supporting mothers in the community'
                loading='lazy'
                className='h-[420px] w-full object-cover sm:h-[500px]'
              />
            </motion.div>

            {/* Floating donation chart card */}
            <motion.div
              className='dark:bg-card absolute right-4 bottom-6 w-52 rounded-2xl bg-white p-5 shadow-lg sm:right-[-20px] sm:w-60'
              initial={{ opacity: 0, y: 16, x: 8 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 16, x: 8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            >
              <p className='text-foreground mb-0.5 text-sm font-semibold'>Donation chart</p>
              <p className='text-muted-foreground mb-4 text-xs'>Donations received in past years</p>

              <div className='flex h-16 items-end gap-2'>
                {[40, 55, 65, 80, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    className='flex flex-1 flex-col items-center gap-1'
                    initial={{ scaleY: 0, originY: 1 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 + i * 0.07 }}
                    style={{ transformOrigin: 'bottom' }}
                  >
                    <div
                      className='w-full rounded-t-sm'
                      style={{
                        height: `${height}%`,
                        backgroundColor: i === 4 ? '#ff1493' : '#86efac'
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              <div className='mt-2 flex gap-2'>
                {['2020', '2021', '2022', '2023', '2024'].map(yr => (
                  <span key={yr} className='text-muted-foreground flex-1 text-center text-[10px]'>
                    {yr}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — text + stat cards */}
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <motion.div variants={fadeUp} initial='hidden' animate={isInView ? 'visible' : 'hidden'} custom={0.25}>
                <Badge variant='outline' className='w-fit px-4 py-1.5 text-sm font-normal'>
                  Skills and Welfare
                </Badge>
              </motion.div>

              <motion.h3
                variants={fadeUp}
                initial='hidden'
                animate={isInView ? 'visible' : 'hidden'}
                custom={0.32}
                className='text-2xl leading-snug font-normal sm:text-3xl'
              >
                Giving Mothers the Tools to Build Better Lives
              </motion.h3>

              <motion.p
                variants={fadeUp}
                initial='hidden'
                animate={isInView ? 'visible' : 'hidden'}
                custom={0.39}
                className='text-muted-foreground text-base leading-relaxed'
              >
                Through skills training and welfare programs, we are helping mothers gain confidence, earn income, and
                provide more stable futures for their children.
              </motion.p>
            </div>

            {/* Stat cards */}
            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  icon: <UsersIcon className='size-4 text-[#166534]' />,
                  bg: '#86efac',
                  label: 'Mothers Supported',
                  value: '200+',
                  delay: 0.46
                },
                {
                  icon: <BookIcon className='size-4 text-[#713f12]' />,
                  bg: '#F5D547',
                  label: 'Women in Training',
                  value: '150+',
                  delay: 0.54
                }
              ].map(({ icon, bg, label, value, delay }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  initial='hidden'
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={delay}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className='border-border bg-card flex cursor-default flex-col gap-3 rounded-2xl border p-5'
                >
                  <div
                    className='flex h-9 w-9 items-center justify-center rounded-full'
                    style={{ backgroundColor: bg }}
                  >
                    {icon}
                  </div>
                  <p className='text-muted-foreground text-sm'>{label}</p>
                  <p className='text-foreground text-3xl font-normal'>{value}</p>
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
