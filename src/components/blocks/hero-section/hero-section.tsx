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
      staggerChildren: 0.1
    }
  }
}

const HeroSection = ({ menudata }: { menudata: MenuData[] }) => {
  const heroImage = menudata?.[0]

  return (
    <section id='home' aria-label='Hero section' className='relative overflow-hidden pt-24 pb-16 lg:pt-40'>
      {/* Radial glow */}
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_40%,var(--color-primary)_0%,transparent_100%)] opacity-[0.04]'
      />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          {/* LEFT */}
          <motion.div className='flex flex-col gap-6' variants={stagger} initial='hidden' animate='show'>
            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-4xl leading-[1.1] font-medium tracking-tight sm:text-6xl lg:text-7xl'
            >
              Empowering mothers,
              <br />
              nurturing every
              <br />
              <span className='text-primary'>child's</span> future
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-muted-foreground max-w-lg text-lg leading-relaxed'
            >
              MabEcare Foundation supports mothers and children across Ghana through welfare programs, skills training,
              and community care — because every family deserves the chance to thrive.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='flex flex-wrap items-center gap-4'
            >
              {/* CTA */}
              <div className='flex flex-wrap items-center gap-4'>
                <div className='group flex items-center gap-0'>
                  {/* Pill Button */}
                  <a
                    href='donate'
                    className='bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-4 text-lg font-normal transition-all'
                  >
                    Donate Now
                  </a>

                  {/* Separate Arrow Circle */}
                  <span className='bg-foreground text-background border-background/10 flex h-14 w-14 items-center justify-center rounded-full border-l transition-all'>
                    <ArrowRightIcon className='h-6 w-6 transition-transform duration-300 group-hover:-rotate-45' />
                  </span>
                </div>

                {/* Volunteer CTA (Text Only - No Background)
                                          <a
                                            href='#volunteer'
                                            className='px-4 py-4 text-lg font-normal text-foreground'
                                          >
                                            Join Us As A Volunteer
                                          </a>
                                          */}
              </div>
            </motion.div>

            {/* Partners */}
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <p className='text-muted-foreground/60 mb-4 text-xs tracking-wider uppercase'>Our Beloved Partners</p>
              <div className='text-foreground flex flex-wrap gap-6 text-sm opacity-40 grayscale'>
                <span>GoCart MotherCare</span>
                <span>Anloga Junction</span>
                <span>Sloane Developers</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className='relative h-[520px] sm:h-[600px] lg:h-[720px]'
            variants={fadeIn}
            initial='hidden'
            animate='show'
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div className='absolute -top-24 right-0 z-10 h-full w-full'>
              <div className='relative h-full w-full overflow-hidden rounded-[2.5rem]'>
                {/* Hero image */}
                {heroImage && (
                  <img
                    src={heroImage.img}
                    alt={heroImage.imgAlt || 'Hero image'}
                    className='h-full w-full object-cover'
                    loading='eager'
                    fetchPriority='high'
                  />
                )}

                {/* Testimonial */}
                {heroImage && (
                  <motion.figure
                    className='bg-background/90 absolute top-8 left-6 max-w-[260px] rounded-2xl p-4 shadow-lg backdrop-blur-sm'
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
                  >
                    <div className='flex items-start gap-3'>
                      <img
                        src={heroImage.userAvatar}
                        className='h-10 w-10 flex-shrink-0 rounded-full object-cover'
                        alt='Donor'
                        loading='lazy'
                        width={40}
                        height={40}
                      />
                      <blockquote className='text-foreground text-xs leading-relaxed'>
                        "{heroImage.userComment.substring(0, 60)}..."
                      </blockquote>
                    </div>
                  </motion.figure>
                )}

                {/* Bottom card */}
                <motion.div
                  className='bg-background/95 absolute right-6 bottom-6 w-56 rounded-3xl p-4 shadow-xl backdrop-blur-sm'
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
                >
                  <h4 className='text-foreground mb-1 text-sm font-semibold'>Growing Together</h4>
                  <p className='text-muted-foreground mb-3 text-[11px] leading-relaxed'>
                    Skills, support, and community for every mother and child.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex -space-x-2'>
                      <div className='border-background h-5 w-5 rounded-full border bg-pink-200' />
                      <div className='border-background h-5 w-5 rounded-full border bg-blue-200' />
                      <div className='border-background h-5 w-5 rounded-full border bg-yellow-200' />
                    </div>
                    <span className='text-foreground text-sm font-normal'>10K+</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
