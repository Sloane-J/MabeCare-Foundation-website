'use client'

import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { motion, useInView } from 'framer-motion'

const HandshakeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.77L12 21.23l7.65-7.65.77-.77a5.4 5.4 0 0 0 0-7.23z" />
  </svg>
)

const BookmarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)

const SmileIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
)

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const features = [
  {
    icon: <HandshakeIcon className="size-5 text-primary" />,
    title: 'Support a Mother Directly',
    description: 'Volunteer your time to visit, encourage, and walk alongside mothers in your community who need care and companionship.',
  },
  {
    icon: <BookmarkIcon className="size-5 text-primary" />,
    title: 'Share a Skill, Change a Life',
    description: 'Teach a trade, run a workshop, or lead a session. Your skills can help a mother become more independent and confident.',
  },
  {
    icon: <SmileIcon className="size-5 text-primary" />,
    title: 'Spread the Word',
    description: 'Awareness is one of the most powerful tools we have. Help us reach more families by sharing our work with those around you.',
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

const VolunteerImpactSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="volunteer-impact" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#f5f5f5] dark:bg-[#722f37] px-8 py-12 sm:px-12 sm:py-16"
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Pink accent blob */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent-secondary/50 blur-3xl pointer-events-none" />

          {/* Top row */}
          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10 sm:mb-14 items-start">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.1}
              className="text-3xl sm:text-4xl font-normal text-foreground leading-snug"
            >
              Volunteer With Us and Help Shape Better Futures
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.2}
              className="text-muted-foreground text-base sm:text-lg sm:text-right leading-relaxed"
            >
              You do not need to be an expert to make a difference. Show up, share what you know, and help us support mothers and children across Ghana.
            </motion.p>
          </div>

          {/* Bottom row */}
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">

            {/* Feature cards */}
            <div className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={0.3 + index * 0.1}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-card rounded-2xl px-6 py-5 flex flex-col gap-2 shadow-sm border border-border cursor-default"
                >
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <h4 className="font-semibold text-foreground text-base">{feature.title}</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right: image + floating elements */}
            <div className="relative flex items-end justify-center lg:justify-end">

              {/* Watch story reel pill */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                className="absolute left-0 bottom-8 z-20 flex items-center gap-3 bg-white dark:bg-card rounded-full pl-4 pr-2 py-2 shadow-md border border-border"
              >
                <span className="text-sm font-medium text-foreground whitespace-nowrap leading-tight">
                  Watch our<br />story reel
                </span>
                <button
                  type="button"
                  aria-label="Watch our story reel"
                  className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                  <PlayIcon className="size-3.5 text-background ml-0.5" />
                </button>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="absolute top-4 right-0 z-20"
              >
                <Badge
                  variant="outline"
                  className="bg-white dark:bg-card text-foreground shadow-md text-xs font-medium px-4 py-2 rounded-full border-border"
                >
                  Real Mothers Changed by Your Support
                </Badge>
              </motion.div>

              {/* Image */}
              <motion.div
                className="relative mt-8 lg:mt-0 w-full"
                initial={{ scale: 0.97, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.97, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=700&q=80"
                  alt="Volunteers spending time with mothers and children in the community"
                  loading="lazy"
                  className="relative z-10 w-full h-72 sm:h-96 object-cover rounded-2xl"
                  style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}
                />
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VolunteerImpactSection
