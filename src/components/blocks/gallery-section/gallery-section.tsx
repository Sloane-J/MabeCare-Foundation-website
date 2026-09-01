'use client'

import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { motion, useInView } from 'framer-motion'

const CameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

const galleryItems = [
  {
    image: '/images/gallery/community-having-fun.webp',
    alt: 'Children receiving support',
    title: 'Children Welfare',
    description: 'Giving every child a chance to thrive.',
  },
  {
    image: '/images/gallery/proud-mother.webp',
    alt: 'Volunteers working together',
    title: 'Community Outreach',
    description: 'Reaching the most vulnerable in our communities.',
  },
  {
    image: '/images/gallery/smiling-girl.webp',
    alt: 'Maternal care support',
    title: 'Maternal Health',
    description: 'Safe delivery and care for every mother.',
  },
  {
    image: '/images/gallery/kids-at-lunch.webp',
    alt: 'Education programs',
    title: 'Education Programs',
    description: 'Building brighter futures through learning.',
  },
  {
    image: '/images/gallery/school-kid.webp',
    alt: 'Volunteer programs',
    title: 'Volunteer Programs',
    description: 'Join hands and make a real difference.',
  },
  {
    image: '/images/gallery/mother-with-child.webp',
    alt: 'Medical aid distribution',
    title: 'Medical Aid',
    description: 'Healthcare is a right, not a privilege.',
  },
  {
    image: '/images/metrics/smiling-children.webp',
    alt: 'Women empowerment',
    title: 'Women Empowerment',
    description: 'Uplifting women to lead and inspire.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
  })
}

const gridItem = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
  })
}

type GalleryItemProps = {
  item: { image: string; alt: string; title: string; description: string }
  style?: React.CSSProperties
  className?: string
  delay?: number
  inView: boolean
}

const GalleryItem = ({ item, style, className, delay = 0, inView }: GalleryItemProps) => {
  return (
    <motion.div
      style={style}
      variants={gridItem}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
    >
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <p className="text-white font-semibold text-sm sm:text-base leading-tight">{item.title}</p>
        <p className="text-white/80 text-xs sm:text-sm mt-1 leading-snug">{item.description}</p>
      </div>
    </motion.div>
  )
}

const GallerySection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
            <Badge variant="outline" className="gap-2 text-sm font-normal px-4 py-1.5">
              <CameraIcon className="size-4 text-primary" />
              Our gallery
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.1}
            className="text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl"
          >
            Moments that <span className="text-primary">matter</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.2}
            className="text-muted-foreground text-base sm:text-lg max-w-xl"
          >
            A glimpse into the lives we touch and the communities we serve. Every image tells a story of hope, resilience, and change.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div
          ref={ref}
          className="grid gap-2"
          style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
        >
          <GalleryItem item={galleryItems[0]} style={{ gridColumn: 'span 3', gridRow: 'span 1' }} className="h-44" delay={0.1} inView={inView} />
          <GalleryItem item={galleryItems[1]} style={{ gridColumn: 'span 5', gridRow: 'span 1' }} className="h-44" delay={0.15} inView={inView} />
          <GalleryItem item={galleryItems[2]} style={{ gridColumn: 'span 4', gridRow: 'span 2' }} className="h-full min-h-[368px]" delay={0.2} inView={inView} />
          <GalleryItem item={galleryItems[3]} style={{ gridColumn: 'span 3', gridRow: 'span 2' }} className="h-full min-h-[368px]" delay={0.25} inView={inView} />
          <GalleryItem item={galleryItems[4]} style={{ gridColumn: 'span 5', gridRow: 'span 2' }} className="h-56 sm:h-full min-h-[368px]" delay={0.3} inView={inView} />
          <GalleryItem item={galleryItems[5]} style={{ gridColumn: 'span 3', gridRow: 'span 1' }} className="h-44" delay={0.35} inView={inView} />
          <GalleryItem item={galleryItems[6]} style={{ gridColumn: 'span 1', gridRow: 'span 1' }} className="h-44" delay={0.4} inView={inView} />
        </div>

      </div>
    </section>
  )
}

export default GallerySection
