'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

type FocusArea = {
  stat: string
  label: string
  tagline: string
  pills: string[]
  image: string
  alt: string
  accentColor: string
  accentBorder: string
  badgeBg: string
  badgeText: string
  icon: React.ReactNode
}

const SparkleIcon = ({ className }: { className?: string }) => (
  <motion.svg
    animate={{ rotate: [0, 15, -15, 0] }}
    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
  </motion.svg>
)

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='7' y1='17' x2='17' y2='7' />
    <polyline points='7 7 17 7 17 17' />
  </svg>
)

const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
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

const focusAreas: FocusArea[] = [
  {
    stat: '200+',
    label: 'Mothers Supported',
    tagline: 'Comprehensive Maternal & Postnatal Care',
    pills: ['Direct Healthcare Aid', 'Emergency Welfare', 'Nursing Support'],
    image: '/images/metrics/mother-braiding-hair.webp',
    alt: 'Mother braiding hair in community setting',
    accentColor: '#F28B5F',
    accentBorder: 'border-[#F28B5F]/40',
    badgeBg: 'bg-[#F28B5F]',
    badgeText: 'text-white',
    icon: <HeartIcon className='size-5 text-white' />
  },
  {
    stat: '150+',
    label: 'Women Empowered',
    tagline: 'Vocational Mastery & Economic Freedom',
    pills: ['Practical Skill-Building', 'Micro-Business Tools', 'Financial Literacy'],
    image: '/images/metrics/working-woman.webp',
    alt: 'Women participating in hands-on skills training',
    accentColor: '#171717',
    accentBorder: 'border-foreground/20',
    badgeBg: 'bg-[#171717]',
    badgeText: 'text-white',
    icon: <BookIcon className='size-5 text-white' />
  },
  {
    stat: '300+',
    label: 'Children Reached',
    tagline: 'Holistic Youth Development & Education',
    pills: ['School Learning Kits', 'Nutritional Security', 'Safe Growth Spaces'],
    image: '/images/metrics/smiling-children.webp',
    alt: 'Children benefiting from foundation educational programs',
    accentColor: '#F5D547',
    accentBorder: 'border-[#F5D547]/60',
    badgeBg: 'bg-[#F5D547]',
    badgeText: 'text-[#171717]',
    icon: <UsersIcon className='size-5 text-[#171717]' />
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 }
  }
}

const ImpactMetrics = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} id='impact-metrics' className='py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        
        {/* Header Block */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='mb-16 flex flex-col items-center text-center'
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant='outline'
              className='gap-2 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary'
            >
              <SparkleIcon className='size-4' />
              Real Impact, Real Stories
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className='mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl'
          >
            Transforming Hope Into{' '}
            <span className='text-primary underline decoration-primary/30 underline-offset-8'>
              Measurable Progress
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className='mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'
          >
            Every statistic represents a mother empowered, a child educated, and a family given the essential resources to thrive independently.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid grid-cols-1 gap-8 lg:grid-cols-3'
        >
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className={`group relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-3xl border ${area.accentBorder} bg-card shadow-sm transition-all duration-300 hover:shadow-2xl`}
            >
              {/* Vibrant Image Layer (Removed grayscale & multiply blends) */}
              <div className='absolute inset-0 z-0 h-full w-full overflow-hidden'>
                <motion.img
                  src={area.image}
                  alt={area.alt}
                  loading='lazy'
                  className='h-full w-full object-cover brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-110'
                />
                
                {/* Modern Directional Gradient Overlays (Keeps image crisp while ensuring full text readability) */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20' />
                <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent' />
              </div>

              {/* Top Card Navigation / Stats Header */}
              <div className='relative z-10 flex items-start justify-between p-6 sm:p-8'>
                <div className='flex items-center gap-3'>
                  <div
                    className={`flex size-11 items-center justify-center rounded-2xl ${area.badgeBg} ${area.badgeText} shadow-md backdrop-blur-md`}
                  >
                    {area.icon}
                  </div>
                  <span className='rounded-full bg-black/40 px-3 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur-md border border-white/10'>
                    {area.label}
                  </span>
                </div>

                <div className='flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black'>
                  <ArrowUpRightIcon className='size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </div>
              </div>

              {/* Bottom Card Content & Stat Display */}
              <div className='relative z-10 flex flex-col justify-end p-6 sm:p-8'>
                {/* Large Vibrant Stat Counter */}
                <div className='flex items-baseline gap-2'>
                  <span className='text-6xl font-extrabold tracking-tight text-white sm:text-7xl drop-shadow-md'>
                    {area.stat}
                  </span>
                </div>

                <h3 className='mt-2 text-xl font-semibold text-white/95 sm:text-2xl drop-shadow-sm'>
                  {area.tagline}
                </h3>

                {/* Pill Feature Tags */}
                <div className='mt-5 flex flex-wrap gap-2'>
                  {area.pills.map((pill, i) => (
                    <span
                      key={i}
                      className='inline-flex items-center rounded-full border border-white/15 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/25'
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accent Color Bottom Progress Line */}
              <div
                className='h-1.5 w-full transition-all duration-500 group-hover:h-2.5'
                style={{ backgroundColor: area.accentColor }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default ImpactMetrics