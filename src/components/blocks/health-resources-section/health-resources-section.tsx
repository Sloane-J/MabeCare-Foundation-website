'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const HandsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0' />
    <path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2' />
    <path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8' />
    <path d='M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15' />
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

const HealthResourcesSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id='health-resources' className='py-12 sm:py-20 lg:py-28 overflow-hidden'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div ref={ref} className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'>
          
          {/* Left — text + stat cards */}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3 text-left'>
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={inView ? 'visible' : 'hidden'}
                custom={0}
              >
                <Badge variant='outline' className='w-fit rounded-full border-border bg-muted/50 px-3.5 py-1 text-xs font-medium text-foreground'>
                  Community Welfare
                </Badge>
              </motion.div>

              <motion.h3
                variants={fadeUp}
                initial='hidden'
                animate={inView ? 'visible' : 'hidden'}
                custom={0.1}
                className='text-2xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug'
              >
                Reaching Mothers Where They Are
              </motion.h3>

              <motion.p
                variants={fadeUp}
                initial='hidden'
                animate={inView ? 'visible' : 'hidden'}
                custom={0.2}
                className='text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md'
              >
                We go into communities to offer direct welfare support, basic needs assistance, and a network of care for mothers and children who need it most.
              </motion.p>
            </div>

            {/* Stat cards */}
            <div className='grid grid-cols-2 gap-3 sm:gap-4 pt-2'>
              {[
                {
                  icon: <HandsIcon className='size-4 text-rose-600 dark:text-rose-400' />,
                  bg: 'bg-rose-500/10 dark:bg-rose-500/20',
                  label: 'Welfare Visits Made',
                  value: '500+',
                  delay: 0.3
                },
                {
                  icon: <UsersIcon className='size-4 text-emerald-600 dark:text-emerald-400' />,
                  bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
                  label: 'Families Supported',
                  value: '120+',
                  delay: 0.4
                }
              ].map(({ icon, bg, label, value, delay }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  initial='hidden'
                  animate={inView ? 'visible' : 'hidden'}
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

          {/* Right — image with floating chart card */}
          <motion.div
            className='relative mx-auto w-full max-w-lg lg:max-w-none'
            variants={fadeIn}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            custom={0.2}
          >
            <div className='overflow-hidden rounded-3xl border border-border/80 bg-card shadow-md'>
              <img
                src='https://images.unsplash.com/photo-1542884748-2b87b36c6b90?w=700&q=80'
                alt='Community outreach worker visiting a mother and child at home'
                loading='lazy'
                className='h-[360px] w-full object-cover object-top sm:h-[480px] brightness-[0.98]'
              />
            </div>

            {/* Floating donation chart card */}
            <motion.div
              variants={fadeUp}
              initial='hidden'
              animate={inView ? 'visible' : 'hidden'}
              custom={0.5}
              className='absolute -bottom-4 left-2 sm:-left-4 sm:bottom-6 w-48 sm:w-56 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-md p-4 shadow-xl'
            >
              <p className='text-foreground text-xs sm:text-sm font-semibold'>Donation Chart</p>
              <p className='text-muted-foreground text-[11px] mb-3'>Donations received in past years</p>

              <div className='flex h-14 items-end gap-1.5'>
                {[35, 50, 65, 80, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${height}%` } : { height: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeOut',
                      delay: 0.6 + i * 0.08
                    }}
                    className={`flex-1 rounded-t-sm transition-colors ${
                      i === 4 ? 'bg-primary' : 'bg-emerald-500/80 dark:bg-emerald-400/80'
                    }`}
                  />
                ))}
              </div>

              <div className='mt-2 flex gap-1 text-[10px] text-muted-foreground'>
                {['2020', '2021', '2022', '2023', '2024'].map(yr => (
                  <span key={yr} className='flex-1 text-center font-mono'>
                    {yr}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default HealthResourcesSection