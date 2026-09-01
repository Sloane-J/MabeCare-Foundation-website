'use client'

import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { motion, useInView } from 'framer-motion'

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
    <path d='M5 12h14M12 5l7 7-7 7' />
  </svg>
)

type Programme = {
  image: string
  alt: string
  category: string
  title: string
  description: string
}

const featuredProgramme: Programme = {
  image: '/images/programmes/donation-drives.jpg',
  alt: 'Volunteers packing donated food and supplies for a MabEcare community donation drive',
  category: 'Direct Relief Outreach',
  title: 'Essential Relief & Community Drives',
  description:
    'Mobilizing emergency food, apparel, and basic living essentials straight into the hands of mothers and vulnerable children who need immediate support.'
}

const topProgrammes: Programme[] = [
  {
    image: '/images/programmes/mother-welfare.webp',
    alt: 'Women participating in a skills training workshop',
    category: 'Maternal Empowerment',
    title: 'Women’s Vocational Skills Training',
    description:
      'Equipping mothers with sustainable trade skills—from tailoring to baking—building long-term financial independence.'
  },
  {
    image: '/images/programmes/mother-welfare.webp',
    alt: 'Children supported through MabEcare outreach programme',
    category: 'Child Welfare',
    title: 'Youth Growth & Education Support',
    description:
      'Nurturing children in underserved communities with educational tools, critical nutrition, and safe learning spaces.'
  }
]

const bottomProgrammes: Programme[] = [
  {
    image: '/images/programmes/blood-donation.jpg',
    alt: 'Blood donation drive with medical volunteers',
    category: 'Healthcare Access',
    title: 'Safe Birth Blood Network',
    description:
      'Organizing vital blood drives to guarantee safe, rapid supply for mothers and infants facing critical delivery complications.'
  },
  {
    image: '/images/programmes/mother-welfare.webp',
    alt: 'Mother receiving mental health counselling',
    category: 'Mental Wellness',
    title: 'Postpartum & Maternal Mental Care',
    description:
      'Providing specialized therapy, support circles, and trauma care to safeguard mothers from postpartum depression and emotional burnout.'
  },
  {
    image: '/images/programmes/contraceptives.jpg',
    alt: 'Young people engaged in an interactive workshop on reproductive health and wellness',
    category: 'Reproductive Health',
    title: 'Sexual & Reproductive Health Education',
    description:
      'Empowering youth and young mothers with foundational health knowledge, advocacy, and direct access to wellness resources.'
  },
  {
    image: '/images/programmes/wars-of-disability.jpg',
    alt: 'Child with special needs receiving dedicated support',
    category: 'Inclusive Care',
    title: 'Special Needs Children’s Advocacy',
    description:
      'Delivering specialized therapy referrals, caregiver training, and adaptive resources to ensure dignity and inclusive care.'
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
    transition: { staggerChildren: 0.12 }
  }
}

const DonationProgramsSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} id='donation-programmes' className='py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        
        {/* Header Block */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='mb-16 flex flex-col items-center text-center'
        >
          <motion.div variants={fadeUp}>
            <Badge variant='outline' className='gap-2 px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary rounded-full'>
              <SparkleIcon className='size-4' />
              Transforming Lives Daily
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className='mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl'
          >
            Fuel Direct Impact Where <span className='text-primary underline decoration-primary/30 underline-offset-8'>It Matters Most</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className='mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed'
          >
            Your contributions go directly to frontline initiatives—protecting maternal health, nurturing children, and fostering long-term community resilience.
          </motion.p>
        </motion.div>

        {/* Hero Bento Box (Top Section) */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12'
        >
          {/* Main Hero Card (Spans 7 cols on lg) */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className='group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 lg:col-span-7'
          >
            <div className='relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden'>
              <motion.img
                src={featuredProgramme.image}
                alt={featuredProgramme.alt}
                loading='lazy'
                className='h-full w-full object-cover'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent lg:hidden' />
              <div className='absolute top-4 left-4'>
                <Badge className='bg-background/90 backdrop-blur text-foreground border border-border rounded-full px-3 py-1 text-xs font-medium'>
                  {featuredProgramme.category}
                </Badge>
              </div>
            </div>

            <div className='flex flex-col justify-between p-6 sm:p-8 flex-1'>
              <div>
                <h3 className='text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
                  {featuredProgramme.title}
                </h3>
                <p className='mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed'>
                  {featuredProgramme.description}
                </p>
              </div>
              <div className='mt-6 flex items-center gap-2 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-200 cursor-pointer'>
                <span>Support this initiative</span>
                <ArrowRightIcon className='size-4' />
              </div>
            </div>
          </motion.div>

          {/* Secondary Stacked Cards (Spans 5 cols on lg) */}
          <div className='flex flex-col gap-6 lg:col-span-5'>
            {topProgrammes.map((programme, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className='group flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 h-full'
              >
                <div className='relative sm:w-2/5 h-48 sm:h-auto overflow-hidden shrink-0'>
                  <motion.img
                    src={programme.image}
                    alt={programme.alt}
                    loading='lazy'
                    className='h-full w-full object-cover'
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className='flex flex-col justify-between p-5 flex-1'>
                  <div>
                    <Badge variant='outline' className='w-fit rounded-full px-2.5 py-0.5 text-xs font-normal mb-2'>
                      {programme.category}
                    </Badge>
                    <h4 className='text-lg font-semibold text-foreground leading-snug'>
                      {programme.title}
                    </h4>
                    <p className='mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed'>
                      {programme.description}
                    </p>
                  </div>
                  <div className='mt-4 flex items-center gap-1.5 text-xs font-medium text-primary group-hover:translate-x-1 transition-transform duration-200 cursor-pointer'>
                    <span>Learn more</span>
                    <ArrowRightIcon className='size-3.5' />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alternating 2x2 Grid (Bottom Section) */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
        >
          {bottomProgrammes.map((programme, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className='group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300'
            >
              <div className='relative h-44 w-full overflow-hidden'>
                <motion.img
                  src={programme.image}
                  alt={programme.alt}
                  loading='lazy'
                  className='h-full w-full object-cover'
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className='absolute top-3 left-3'>
                  <Badge variant='outline' className='bg-background/90 backdrop-blur border-border rounded-full px-2.5 py-0.5 text-xs font-normal'>
                    {programme.category}
                  </Badge>
                </div>
              </div>
              
              <div className='flex flex-1 flex-col justify-between p-5'>
                <div>
                  <h4 className='text-base font-semibold text-foreground leading-snug'>
                    {programme.title}
                  </h4>
                  <p className='mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                    {programme.description}
                  </p>
                </div>

                <div className='mt-5 flex items-center gap-1.5 text-xs font-medium text-primary group-hover:translate-x-1 transition-transform duration-200 cursor-pointer pt-3 border-t border-border/50'>
                  <span>Inquire or Support</span>
                  <ArrowRightIcon className='size-3.5' />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  )
}

export default DonationProgramsSection