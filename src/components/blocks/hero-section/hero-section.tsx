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

// Animation variants
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
    <section id='home' aria-label='Hero section' className='relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24'>
      {/* Refined Radial glow */}
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary)_0%,transparent_60%)] opacity-[0.08]'
      />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8'>
          {/* LEFT CONTENT */}
          <motion.div className='flex flex-col gap-8 lg:pr-8' variants={stagger} initial='hidden' animate='show'>
            
            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl text-foreground'
            >
              Empowering mothers,
              <br className="hidden sm:block" />
              {' '}nurturing every
              <br className="hidden sm:block" />
              {' '}<span className='text-primary'>child's</span> future
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-muted-foreground max-w-xl text-lg sm:text-xl leading-relaxed'
            >
              MabEcare Foundation supports mothers and children across Ghana through welfare programs, skills training,
              and community care — because every family deserves the chance to thrive.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='flex flex-wrap items-center gap-6 mt-2'
            >
              <div className='group flex items-center gap-2'>
                {/* Main Capsule Button */}
                <a
                  href='/donate'
                  className='bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center rounded-full px-8 py-4 text-base sm:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                >
                  Donate Now
                </a>

                {/* Floating Arrow Circle */}
                <span className='bg-foreground text-background flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:-translate-y-0.5'>
                  <ArrowRightIcon className='h-6 w-6 transition-transform duration-300 group-hover:-rotate-45 group-hover:scale-110' />
                </span>
              </div>
            </motion.div>

            {/* Partners */}
            {/*<motion.div variants={fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }} className="mt-6 lg:mt-10">
              <p className='text-muted-foreground/70 mb-5 text-xs font-semibold tracking-widest uppercase'>
                Our Beloved Partners
              </p>
              <div className='flex flex-wrap items-center gap-x-8 gap-y-4 text-sm sm:text-base font-medium text-foreground opacity-50 grayscale'>
                <span className="hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">GoCart MotherCare</span>
                <span className="hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">Anloga Junction</span>
                <span className="hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">Sloane Developers</span>
              </div>
            </motion.div>*/}

          </motion.div>

          {/* RIGHT CONTENT (IMAGE & GLASS CARDS) */}
          <motion.div
            className='relative w-full h-[450px] sm:h-[550px] lg:h-[680px]'
            variants={fadeIn}
            initial='hidden'
            animate='show'
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div className='relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl'>
              {/* Hero image */}
              {heroImage && (
                <img
                  src={heroImage.img}
                  alt={heroImage.imgAlt || 'Hero image'}
                  className='h-full w-full object-cover transition-transform duration-700 hover:scale-105'
                  loading='eager'
                  fetchPriority='high'
                />
              )}

              {/* Glassmorphism Testimonial */}
              {heroImage && (
                <motion.figure
                  className='absolute top-6 left-6 sm:top-8 sm:left-8 max-w-[280px] rounded-2xl p-4 shadow-xl backdrop-blur-md bg-white/80 dark:bg-black/60 border border-white/30 dark:border-white/10'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
                >
                  <div className='flex items-start gap-3'>
                    <img
                      src={heroImage.userAvatar}
                      className='h-11 w-11 flex-shrink-0 rounded-full object-cover ring-2 ring-white/50 dark:ring-black/50'
                      alt='Donor'
                      loading='eager'
                      width={44}
                      height={44}
                    />
                    <blockquote className='text-foreground text-xs sm:text-sm leading-relaxed font-medium'>
                      "{heroImage.userComment.substring(0, 60)}..."
                    </blockquote>
                  </div>
                </motion.figure>
              )}

              {/* Glassmorphism Bottom Card */}
              <motion.div
                className='absolute right-6 bottom-6 sm:right-8 sm:bottom-8 w-60 rounded-3xl p-5 shadow-2xl backdrop-blur-md bg-white/85 dark:bg-black/65 border border-white/30 dark:border-white/10'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
              >
                <h4 className='text-foreground mb-1.5 text-sm font-bold tracking-wide'>Growing Together</h4>
                <p className='text-muted-foreground mb-4 text-xs leading-relaxed'>
                  Skills, support, and community for every mother and child.
                </p>
                <div className='flex items-center justify-between'>
                  <div className='flex -space-x-2.5'>
                    <div className='h-7 w-7 rounded-full border-2 border-white dark:border-zinc-900 bg-pink-300 shadow-sm' />
                    <div className='h-7 w-7 rounded-full border-2 border-white dark:border-zinc-900 bg-blue-300 shadow-sm' />
                    <div className='h-7 w-7 rounded-full border-2 border-white dark:border-zinc-900 bg-yellow-300 shadow-sm' />
                  </div>
                  <span className='text-foreground text-sm font-bold'>10K+</span>
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