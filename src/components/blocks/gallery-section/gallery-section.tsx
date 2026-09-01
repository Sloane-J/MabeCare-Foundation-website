'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

type GalleryItem = {
  image: string
  alt: string
  category: string
  title: string
  description: string
  colSpan: string
  height: string
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
    alt: 'Children receiving support and playing together in community event',
    category: 'Child Welfare',
    title: 'Joy & Community Support',
    description: 'Nurturing safe, joyful environments where every child can laugh, learn, and grow.',
    colSpan: 'col-span-12 md:col-span-7',
    height: 'h-[340px] sm:h-[420px]'
  },
  {
    image: '/images/gallery/proud-mother.webp',
    alt: 'Volunteers and mothers working together during outreach',
    category: 'Community Outreach',
    title: 'Grassroots Direct Relief',
    description: 'Connecting essential supplies directly to mothers and infants in underserved areas.',
    colSpan: 'col-span-12 md:col-span-5',
    height: 'h-[340px] sm:h-[420px]'
  },
  {
    image: '/images/gallery/smiling-girl.webp',
    alt: 'Young girl benefiting from maternal and child health programs',
    category: 'Maternal Health',
    title: 'Pre & Postnatal Care',
    description: 'Dignified healthcare support ensuring safe delivery and healthy beginnings.',
    colSpan: 'col-span-12 sm:col-span-6 md:col-span-4',
    height: 'h-[300px] sm:h-[340px]'
  },
  {
    image: '/images/gallery/kids-at-lunch.webp',
    alt: 'Children enjoying nutritious lunch provided by education programs',
    category: 'Youth Education',
    title: 'Nourishment & Learning',
    description: 'Combining daily nutritional security with interactive classroom education.',
    colSpan: 'col-span-12 sm:col-span-6 md:col-span-4',
    height: 'h-[300px] sm:h-[340px]'
  },
  {
    image: '/images/gallery/school-kid.webp',
    alt: 'School child wearing uniform supported by outreach programs',
    category: 'Volunteer Action',
    title: 'Uniting Hearts & Hands',
    description: 'Mobilizing passionate volunteers to create lasting local impact.',
    colSpan: 'col-span-12 sm:col-span-12 md:col-span-4',
    height: 'h-[300px] sm:h-[340px]'
  },
  {
    image: '/images/gallery/mother-with-child.webp',
    alt: 'Mother holding child receiving medical aid distribution',
    category: 'Medical Relief',
    title: 'Essential Healthcare Aid',
    description: 'Ensuring critical medical resources and wellness checks are always accessible.',
    colSpan: 'col-span-12 md:col-span-5',
    height: 'h-[320px] sm:h-[380px]'
  },
  {
    image: '/images/metrics/smiling-children.webp',
    alt: 'Empowered women and children thriving in foundation programs',
    category: 'Women Empowerment',
    title: 'Sustainable Independence',
    description: 'Uplifting women with practical vocational skills to build self-reliant futures.',
    colSpan: 'col-span-12 md:col-span-7',
    height: 'h-[320px] sm:h-[380px]'
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

const GallerySection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} id='gallery' className='py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        
        {/* Header */}
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
              <CameraIcon className='size-4' />
              Capturing Every Smile & Story
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className='mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl'
          >
            Witness the Power of{' '}
            <span className='text-primary underline decoration-primary/30 underline-offset-8'>
              Hope & Community
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className='mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'
          >
            Step into the stories of resilience, joy, and transformation made possible by generous hands and caring hearts across Ghana.
          </motion.p>
        </motion.div>

        {/* Fixed Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid grid-cols-12 gap-4 sm:gap-6'
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className={`group relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-2xl ${item.colSpan} ${item.height}`}
            >
              {/* Image with High Clarity (No harsh dark filter by default) */}
              <motion.img
                src={item.image}
                alt={item.alt}
                loading='lazy'
                className='absolute inset-0 h-full w-full object-cover brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-108'
              />

              {/* Gradient overlay for perfect legibility on hover & default */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/95 group-hover:via-black/40' />

              {/* Category Badge - Top Left */}
              <div className='absolute top-4 left-4 z-10'>
                <Badge className='border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground'>
                  {item.category}
                </Badge>
              </div>

              {/* Interactive Icon - Top Right */}
              <div className='absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:bg-white group-hover:text-black group-hover:scale-110'>
                <ArrowUpRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </div>

              {/* Bottom Content Area */}
              <div className='absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 transition-transform duration-300 group-hover:translate-y-0'>
                <h3 className='text-lg sm:text-xl font-semibold text-white tracking-tight drop-shadow-sm'>
                  {item.title}
                </h3>
                <p className='mt-1.5 text-xs sm:text-sm text-white/85 line-clamp-2 leading-relaxed opacity-90 transition-opacity duration-300 group-hover:opacity-100'>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default GallerySection