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
    icon: <HandshakeIcon className="size-5 text-primary dark:text-rose-400" />,
    title: 'Support a Mother Directly',
    description: 'Volunteer your time to visit, encourage, and walk alongside mothers in your community who need care and companionship.',
  },
  {
    icon: <BookmarkIcon className="size-5 text-primary dark:text-rose-400" />,
    title: 'Share a Skill, Change a Life',
    description: 'Teach a trade, run a workshop, or lead a session. Your skills can help a mother become more independent and confident.',
  },
  {
    icon: <SmileIcon className="size-5 text-primary dark:text-rose-400" />,
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
          className="relative overflow-hidden rounded-3xl bg-zinc-100/80 dark:bg-[#2C1418] border border-zinc-200/60 dark:border-rose-950/50 px-8 py-12 sm:px-12 sm:py-16 shadow-xl"
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Accent radial light glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-400/20 dark:bg-rose-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-400/15 dark:bg-rose-900/20 blur-3xl pointer-events-none" />

          {/* Top row */}
          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10 sm:mb-14 items-start">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.1}
              className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-rose-50 leading-tight tracking-tight"
            >
              Volunteer With Us and Help Shape Better Futures
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.2}
              className="text-zinc-600 dark:text-rose-100/80 text-base sm:text-lg sm:text-right leading-relaxed"
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
                  className="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl px-6 py-5 flex flex-col gap-2 shadow-sm hover:shadow-md border border-zinc-200/80 dark:border-zinc-800 transition-all duration-200 cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 dark:bg-rose-500/15 flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">{feature.title}</h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed pl-11">
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
                className="absolute left-2 bottom-6 z-20 flex items-center gap-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full pl-4 pr-2 py-2 shadow-lg border border-zinc-200/80 dark:border-zinc-700/80"
              >
                <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap leading-tight">
                  Watch our<br />story reel
                </span>
                <button
                  type="button"
                  aria-label="Watch our story reel"
                  className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-rose-500 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform"
                >
                  <PlayIcon className="size-3.5 text-white ml-0.5" />
                </button>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="absolute top-2 right-2 z-20"
              >
                <Badge
                  variant="outline"
                  className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-900 dark:text-zinc-100 shadow-lg text-xs font-medium px-4 py-2 rounded-full border-zinc-200/80 dark:border-zinc-700/80"
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
                  src="/images/charity-volunteer.webp"
                  alt="Volunteers spending time with mothers and children in the community"
                  loading="lazy"
                  className="relative z-10 w-full h-72 sm:h-96 object-cover rounded-2xl shadow-md border border-zinc-200/50 dark:border-zinc-800/50"
                  style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 5%)' }}
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