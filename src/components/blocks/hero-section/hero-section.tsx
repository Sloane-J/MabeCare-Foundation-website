'use client'

import { motion } from 'framer-motion'

const ArrowRightIcon = ({ className }: { className?: string }) => (
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
    <line x1='5' y1='12' x2='19' y2='12' />
    <polyline points='12 5 19 12 12 19' />
  </svg>
)

export type MenuData = {
  id: number
  img: string
  imgAlt: string
  userAvatar: string
  userComment: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const HeroSection = ({ menudata }: { menudata: MenuData[] }) => {
  const heroImage = menudata?.[0]

  return (
    <section
      id='home'
      aria-label='Hero section'
      className='relative overflow-hidden pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20'
    >
      {/* Refined Radial Glow */}
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary)_0%,transparent_60%)] opacity-[0.08]'
      />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12'>

          {/* LEFT CONTENT */}
          <motion.div
            className='flex flex-col gap-6 lg:pr-8'
            variants={stagger}
            initial='hidden'
            animate='show'
          >
            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl'
            >
              Better Care.
              <br className='hidden sm:block' />
              {' '}Healthier Mothers.
              <br className='hidden sm:block' />
              {' '}<span className='text-primary'>Brighter</span> Futures
            </motion.h1>

            {/* Subtext */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='max-w-xl space-y-3'
            >
              <p className='text-base leading-relaxed text-muted-foreground sm:text-lg'>
                MabEcare supports mothers, children, and families through every
                stage of the journey, from preconception and pregnancy to
                postnatal care, early childhood development, health screening,
                and beyond.
              </p>

              <p className='text-sm font-medium leading-relaxed text-foreground/70 sm:text-base'>
                Supporting families. Improving lives. Building healthier
                communities.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='mt-1 flex flex-wrap items-center'
            >
              <div className='group flex items-center gap-2'>
                <a
                  href='/donate'
                  className='flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base'
                >
                  Donate Now
                </a>

                <span className='flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl sm:h-14 sm:w-14'>
                  <ArrowRightIcon className='h-5 w-5 transition-transform duration-300 group-hover:-rotate-45 group-hover:scale-110 sm:h-6 sm:w-6' />
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            className='relative h-[400px] w-full sm:h-[500px] lg:h-[600px]'
            variants={fadeIn}
            initial='hidden'
            animate='show'
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.2
            }}
          >
            <div className='relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl sm:rounded-[2.5rem]'>

              {/* Hero Image */}
              {heroImage && (
                <img
                  src={heroImage.img}
                  alt={heroImage.imgAlt || 'Hero image'}
                  className='h-full w-full object-cover transition-transform duration-700 hover:scale-105'
                  loading='eager'
                  fetchPriority='high'
                />
              )}

              {/* Bottom Glass Card */}
              <motion.div
                className='absolute bottom-5 right-5 w-52 rounded-2xl border border-white/30 bg-white/85 p-4 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/65 sm:bottom-7 sm:right-7 sm:w-56 sm:p-5'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: 0.8
                }}
              >
                <h4 className='mb-1 text-sm font-bold tracking-wide text-foreground'>
                  Growing Together
                </h4>

                <p className='mb-3 text-xs leading-relaxed text-muted-foreground'>
                  Skills, support, and community for every mother and child.
                </p>

                <div className='flex items-center justify-between'>
                  <div className='flex -space-x-2.5'>
                    <div className='h-7 w-7 rounded-full border-2 border-white bg-pink-300 shadow-sm dark:border-zinc-900' />
                    <div className='h-7 w-7 rounded-full border-2 border-white bg-blue-300 shadow-sm dark:border-zinc-900' />
                    <div className='h-7 w-7 rounded-full border-2 border-white bg-yellow-300 shadow-sm dark:border-zinc-900' />
                  </div>

                  <span className='text-sm font-bold text-foreground'>
                    100+
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection