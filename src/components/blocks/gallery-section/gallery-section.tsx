'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

type GalleryItem = {
  image: string
  alt: string
  title: string
  description: string
  colSpan: string
  height: string
}

const CameraIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z' />
    <circle cx='12' cy='13' r='4' />
  </svg>
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

const galleryItems: GalleryItem[] = [
  {
    image: '/images/gallery/community-having-fun.webp',
    alt: 'Children receiving support and playing together at a community event',
    title: 'Joy in Community',
    description:
      'Creating safe, joyful spaces where children can learn, connect, and grow.',
    colSpan: 'col-span-12 md:col-span-7',
    height: 'h-[300px] sm:h-[360px]'
  },
  {
    image: '/images/gallery/proud-mother.webp',
    alt: 'Mother and volunteers during a community outreach',
    title: 'Supporting Mothers',
    description:
      'Bringing essential care, supplies, and support directly to families who need them.',
    colSpan: 'col-span-12 md:col-span-5',
    height: 'h-[300px] sm:h-[360px]'
  },
  {
    image: '/images/gallery/smiling-girl.webp',
    alt: 'Young girl benefiting from maternal and child health programs',
    title: 'Healthy Beginnings',
    description:
      'Supporting mothers and children through essential health and wellbeing services.',
    colSpan: 'col-span-12 sm:col-span-6 md:col-span-4',
    height: 'h-[270px] sm:h-[310px]'
  },
  {
    image: '/images/gallery/kids-at-lunch.webp',
    alt: 'Children enjoying a nutritious meal',
    title: 'Nourishment & Learning',
    description:
      'Helping children access nutrition and the support they need to thrive.',
    colSpan: 'col-span-12 sm:col-span-6 md:col-span-4',
    height: 'h-[270px] sm:h-[310px]'
  },
  {
    image: '/images/gallery/school-kid.webp',
    alt: 'School child supported through community outreach',
    title: 'Education That Matters',
    description:
      'Creating opportunities for children to learn, develop confidence, and build brighter futures.',
    colSpan: 'col-span-12 sm:col-span-12 md:col-span-4',
    height: 'h-[270px] sm:h-[310px]'
  },
  {
    image: '/images/gallery/mother-with-child.webp',
    alt: 'Mother holding her child during a healthcare outreach',
    title: 'Essential Healthcare',
    description:
      'Making vital health resources and wellness support more accessible to families.',
    colSpan: 'col-span-12 md:col-span-5',
    height: 'h-[290px] sm:h-[340px]'
  },
  {
    image: '/images/metrics/smiling-children.webp',
    alt: 'Children thriving through foundation programs',
    title: 'Building Brighter Futures',
    description:
      'Investing in healthier, stronger communities where children can thrive.',
    colSpan: 'col-span-12 md:col-span-7',
    height: 'h-[290px] sm:h-[340px]'
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
    transition: {
      staggerChildren: 0.1
    }
  }
}

const GallerySection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px'
  })

  return (
    <section
      ref={sectionRef}
      id='gallery'
      className='py-14 sm:py-20 lg:py-24'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
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
              <CameraIcon className='size-4' />
              Our Work in Action
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className='mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl'
          >
            Stories of{' '}
            <span className='text-primary underline decoration-primary/30 underline-offset-8'>
              Hope & Impact
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className='mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base'
          >
            A look at the people, families, and communities at the heart of
            MabEcare&apos;s work.
          </motion.p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid grid-cols-12 gap-4 sm:gap-5'
        >
          {galleryItems.map((item, index) => (
            <motion.article
              key={index}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-shadow duration-300 hover:border-primary/30 hover:shadow-xl ${item.colSpan} ${item.height}`}
            >
              {/* Image */}
              <motion.img
                src={item.image}
                alt={item.alt}
                loading='lazy'
                className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
              />

              {/* Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5' />

              {/* Top action */}
              <div className='absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black'>
                <ArrowUpRightIcon className='size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
              </div>

              {/* Content */}
              <div className='absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6'>
                <h3 className='text-lg font-semibold tracking-tight text-white sm:text-xl'>
                  {item.title}
                </h3>

                <p className='mt-1.5 max-w-lg text-xs leading-relaxed text-white/80 sm:text-sm'>
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default GallerySection