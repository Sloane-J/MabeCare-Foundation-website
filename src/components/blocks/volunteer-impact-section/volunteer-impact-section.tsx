'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const HandshakeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 5 9 8" />
  </svg>
)

const SkillIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 14 4-2 4 2-4 2-4-2Z" />
    <path d="M4 10l8 4 8-4-8-4-8 4Z" />
    <path d="M4 14l8 4 8-4" />
    <path d="M4 18l8 4 8-4" />
  </svg>
)

const MegaphoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 11 18-5v12L3 13v-2z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
)

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
)

// Shortened text descriptions to fit equal-width layout cleanly
const features = [
  {
    icon: <HandshakeIcon className="size-5 text-primary" />,
    title: 'Listen to Real Stories',
    description:
      'Connect directly with mothers to hear their personal journeys and experiences firsthand.',
  },
  {
    icon: <SkillIcon className="size-5 text-primary" />,
    title: 'Gather Key Learnings',
    description:
      'Gain valuable insights from lived experiences to better understand community needs.',
  },
  {
    icon: <MegaphoneIcon className="size-5 text-primary" />,
    title: 'Share & Amplify Voices',
    description:
      'Spread these powerful stories across your network to drive real awareness and action.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
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
          className="relative overflow-hidden rounded-3xl border border-border/80 bg-slate-50/80 dark:bg-zinc-900/60 backdrop-blur-xl px-6 py-10 sm:px-12 sm:py-16 shadow-xl transition-colors duration-300"
        >
          {/* Subtle Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
              backgroundSize: '36px 36px',
            }}
          />

          {/* Ambient Glow Effects */}
          <div className="absolute -top-24 -right-24 size-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-rose-500/10 dark:bg-rose-500/15 blur-3xl pointer-events-none" />

          {/* Top Header Row */}
          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10 sm:mb-14 items-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.1}
              className="space-y-3"
            >
              <Badge
                variant="outline"
                className="rounded-full border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary"
              >
                Stories & Shared Insights
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-tight">
                Listen to Stories.{' '}
                <span className="text-primary underline decoration-primary/30 underline-offset-4">
                  Share the Journey.
                </span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.2}
              className="text-muted-foreground text-base sm:text-lg sm:text-right leading-relaxed pt-2"
            >Every meaningful change starts with listening. Discover real stories, learn from lived experiences, and share these powerful voices to uplift mothers and children across Ghana.</motion.p>
          </div>

          {/* Equal 50/50 Layout Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            {/* Left: Interactive Feature Cards (Takes up 6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-3.5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={0.3 + index * 0.1}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 dark:bg-card/60 p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      {feature.icon}
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Media Showcase (Takes up 6 cols) */}
            <div className="group lg:col-span-6 relative flex items-center justify-center w-full">
               {/*Watch Story Reel Button (Visible on Hover) */}
              <motion.a
                href="https://www.youtube.com/watch?v=Ou58uHb9Piw"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                className="absolute left-3 bottom-6 z-30 flex items-center gap-3 rounded-full border border-border/80 bg-background/90 backdrop-blur-md pl-4 pr-2 py-2 shadow-xl opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto hover:scale-105 active:scale-95"
              >
                <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
                  Watch Story
                </span>
                <div
                  aria-label="Watch volunteer story reel"
                  className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"
                >
                  <PlayIcon className="size-3.5 ml-0.5" />
                </div>
              </motion.a>

              {/* Top Impact Tag */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="absolute top-3 right-3 z-20 pointer-events-none"
              >
                <Badge
                  variant="outline"
                  className="border-border/80 bg-background/90 text-foreground backdrop-blur-md shadow-lg text-xs font-medium px-3.5 py-1.5 rounded-full"
                >
                  Real Stories, Lasting Impact
                </Badge>
              </motion.div>

              {/* Main Video Container with 16:9 Aspect Ratio */}
              <motion.div
                className="relative w-full aspect-video overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg z-10"
                initial={{ scale: 0.97, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.97, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              >
                <iframe
                  src="https://www.youtube.com/embed/Ou58uHb9Piw?autoplay=0&mute=1&controls=1&loop=1&playlist=Ou58uHb9Piw&rel=0"
                  title="Volunteers supporting mothers and children in community programs"
                  className="absolute inset-0 size-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VolunteerImpactSection