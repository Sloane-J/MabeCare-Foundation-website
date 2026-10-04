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
    image: '/images/programmes/women-skill-training.webp',
    alt: 'Women participating in a skills training workshop',
    category: 'Maternal Empowerment',
    title: 'Women’s Vocational Skills Training',
    description:
      'Equipping mothers with sustainable trade skills—from tailoring to baking—building long-term financial independence.'
  },
  {
    image: '/images/programmes/child-education.webp',
    alt: 'Children supported through MabEcare outreach programme',
    category: 'Child Welfare',
    title: 'Early Childhood Education',
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
    image: '/images/programmes/post-maternal-care.webp',
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const DonationProgramsSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px'
  })

  return (
    <section
      ref={sectionRef}
      id='donation-programmes'
      className='py-14 sm:py-20 lg:py-24'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header Block */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='mb-10 flex flex-col items-center text-center sm:mb-12'
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant='outline'
              className='gap-2 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary'
            >
              <SparkleIcon className='size-4' />
              Transforming Lives Daily
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className='mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl'
          >
            Fuel Direct Impact Where{' '}
            <span className='text-primary underline decoration-primary/30 underline-offset-8'>
              It Matters Most
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className='mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base'
          >
            Your contributions go directly to frontline initiatives—protecting
            maternal health, nurturing children, and fostering long-term
            community resilience.
          </motion.p>
        </motion.div>

        {/* Featured Programmes */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='mb-6 grid grid-cols-1 gap-5 lg:grid-cols-12'
        >
          {/* Featured Card */}
          <motion.article
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className='group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl lg:col-span-7'
          >
            <div className='relative h-56 overflow-hidden sm:h-64 lg:h-72'>
              <motion.img
                src={featuredProgramme.image}
                alt={featuredProgramme.alt}
                loading='lazy'
                className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
              />

              <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />

              <div className='absolute left-4 top-4'>
                <Badge className='rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md'>
                  {featuredProgramme.category}
                </Badge>
              </div>
            </div>

            <div className='flex flex-1 flex-col justify-between p-5 sm:p-6'>
              <div>
                <h3 className='text-xl font-semibold tracking-tight text-foreground sm:text-2xl'>
                  {featuredProgramme.title}
                </h3>

                <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                  {featuredProgramme.description}
                </p>
              </div>

              <div className='mt-5 flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-1'>
                <span>Support this initiative</span>
                <ArrowRightIcon className='size-4' />
              </div>
            </div>
          </motion.article>

          {/* Secondary Programmes */}
          <div className='grid grid-cols-1 gap-5 lg:col-span-5'>
            {topProgrammes.map((programme, idx) => (
              <motion.article
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className='group flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg'
              >
                <div className='relative hidden w-2/5 shrink-0 overflow-hidden sm:block'>
                  <motion.img
                    src={programme.image}
                    alt={programme.alt}
                    loading='lazy'
                    className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                  />
                </div>

                <div className='flex flex-1 flex-col justify-between p-5'>
                  <div>
                    <Badge
                      variant='outline'
                      className='mb-2 w-fit rounded-full px-2.5 py-0.5 text-xs font-normal'
                    >
                      {programme.category}
                    </Badge>

                    <h4 className='text-base font-semibold leading-snug text-foreground sm:text-lg'>
                      {programme.title}
                    </h4>

                    <p className='mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm'>
                      {programme.description}
                    </p>
                  </div>

                  <div className='mt-4 flex items-center gap-1.5 text-xs font-medium text-primary transition-transform duration-200 group-hover:translate-x-1'>
                    <span>Learn more</span>
                    <ArrowRightIcon className='size-3.5' />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Additional Programmes */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
        >
          {bottomProgrammes.map((programme, index) => (
            <motion.article
              key={index}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className='group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl'
            >
              <div className='relative h-36 w-full overflow-hidden sm:h-40'>
                <motion.img
                  src={programme.image}
                  alt={programme.alt}
                  loading='lazy'
                  className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                />

                <div className='absolute left-3 top-3'>
                  <Badge
                    variant='outline'
                    className='rounded-full border-white/20 bg-black/50 px-2.5 py-0.5 text-xs font-normal text-white backdrop-blur-md'
                  >
                    {programme.category}
                  </Badge>
                </div>
              </div>

              <div className='flex flex-1 flex-col justify-between p-5'>
                <div>
                  <h4 className='text-base font-semibold leading-snug text-foreground'>
                    {programme.title}
                  </h4>

                  <p className='mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm'>
                    {programme.description}
                  </p>
                </div>

                <div className='mt-4 flex items-center gap-1.5 border-t border-border/50 pt-3 text-xs font-medium text-primary transition-transform duration-200 group-hover:translate-x-1'>
                  <span>Inquire or Support</span>
                  <ArrowRightIcon className='size-3.5' />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default DonationProgramsSection