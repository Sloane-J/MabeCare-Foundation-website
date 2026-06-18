import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const HandsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
    <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
}

const HealthResourcesSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="health-resources" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">

          {/* Left — text + stat cards */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={0}
              >
                <Badge variant="outline" className="w-fit text-sm font-normal px-4 py-1.5">
                  Community Welfare
                </Badge>
              </motion.div>

              <motion.h3
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={0.1}
                className="text-2xl sm:text-3xl font-normal leading-snug"
              >
                Reaching Mothers Where They Are
              </motion.h3>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={0.2}
                className="text-muted-foreground text-base leading-relaxed max-w-md"
              >
                We go into communities to offer direct welfare support, basic needs assistance, and a network of care for mothers and children who need it most.
              </motion.p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={0.3}
                className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#fca5a5] flex items-center justify-center">
                  <HandsIcon className="size-4 text-[#991b1b]" />
                </div>
                <p className="text-sm text-muted-foreground">Welfare Visits Made</p>
                <p className="text-3xl font-normal text-foreground">500+</p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={0.4}
                className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#86efac] flex items-center justify-center">
                  <UsersIcon className="size-4 text-[#166534]" />
                </div>
                <p className="text-sm text-muted-foreground">Families Supported</p>
                <p className="text-3xl font-normal text-foreground">120+</p>
              </motion.div>
            </div>
          </div>

          {/* Right — image with floating chart card */}
          <div className="relative">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.2}
              className="rounded-3xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?w=700&q=80"
                alt="Community outreach worker visiting a mother and child at home"
                loading="lazy"
                className="w-full h-[420px] sm:h-[500px] object-cover object-top"
              />
            </motion.div>

            {/* Floating donation chart card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.5}
              className="absolute bottom-6 left-4 sm:left-[-20px] bg-white dark:bg-card rounded-2xl shadow-lg p-5 w-52 sm:w-60"
            >
              <p className="text-sm font-semibold text-foreground mb-0.5">Donation chart</p>
              <p className="text-xs text-muted-foreground mb-4">Donations received in past years</p>

              <div className="flex items-end gap-2 h-16">
                {[35, 50, 65, 80, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${height}%` } : { height: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 + i * 0.08 }}
                    className="flex flex-col items-center gap-1 flex-1 self-end rounded-t-sm"
                    style={{ backgroundColor: i === 4 ? '#ff1493' : '#86efac' }}
                  />
                ))}
              </div>

              <div className="flex gap-2 mt-2">
                {['2020', '2021', '2022', '2023', '2024'].map((yr) => (
                  <span key={yr} className="flex-1 text-center text-[10px] text-muted-foreground">{yr}</span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HealthResourcesSection
