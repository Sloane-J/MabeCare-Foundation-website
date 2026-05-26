import { Button } from '@/components/ui/button'

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const stats = [
  { value: '200+', label: 'Mothers Supported' },
  { value: '150+', label: 'Women in Training' },
  { value: '300+', label: 'Children Reached' },
]

const CallToAction = () => {
  return (
    <section id="cta" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] dark:bg-[#111]">

          {/* Pink glow — top left */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
          {/* Pink glow — bottom right */}
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

          {/* Dot grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left — text content */}
            <div className="flex flex-col justify-center gap-8 px-8 py-14 sm:px-14 sm:py-16">

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <HeartIcon className="size-4 text-primary" />
                <span className="text-primary text-sm font-normal uppercase tracking-widest">
                  Make an impact
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Together, we can
                <br />
                <span className="text-primary">change lives</span>
                <br />
                for good.
              </h2>

              {/* Subtext */}
              <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-md">
                Every donation and every hour you give helps a mother gain skills, meet her basic needs, and build a better life for her children.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Button
                  className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-5 text-sm font-normal gap-2"
                >
                  Donate Now
                  <ArrowRightIcon className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 py-5 text-sm font-normal"
                >
                  Become A Volunteer
                </Button>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-2xl font-normal text-white">{stat.value}</span>
                    <span className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image collage */}
            <div className="relative hidden lg:flex items-end justify-end overflow-hidden min-h-[480px]">

              {/* Large main image */}
              <img
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80"
                alt="Volunteers in the community"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%)' }}
              />

              {/* Floating card — top right */}
              <div className="absolute top-10 right-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 max-w-[180px]">
                <p className="text-white text-xs leading-snug opacity-80">
                  Supporting mothers and children to grow, thrive, and build brighter futures together.
                </p>
              </div>

              {/* Floating avatar stack card — bottom left */}
              <div className="absolute bottom-10 left-6 flex flex-col gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
                    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Volunteer"
                      loading="lazy"
                      className="w-8 h-8 rounded-full object-cover border-2 border-white/20 grayscale"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-white text-sm font-normal">200+ Mothers</p>
                  <p className="text-white/50 text-xs">supported so far</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
