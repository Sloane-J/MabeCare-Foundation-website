import { Badge } from '@/components/ui/badge'

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
    title: 'Make a Tangible Impact',
    description: 'An invitation for individuals to join hands with the charity through volunteering efforts.',
  },
  {
    icon: <BookmarkIcon className="size-5 text-primary" />,
    title: 'Gain New Skills and Experiences',
    description: 'A call for supporters to create their own fundraising events or campaigns.',
  },
  {
    icon: <SmileIcon className="size-5 text-primary" />,
    title: 'Boost Mental Well-being',
    description: 'A reminder that awareness is just as good as giving. Encourage people to spread the word.',
  },
]

const VolunteerImpactSection = () => {
  return (
    <section id="volunteer-impact" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 sm:px-12 sm:py-16"
          style={{
            backgroundImage: `radial-gradient(circle at 60% 50%, #ff69b4 0%, #ff1493 60%, #cc0077 100%)`,
          }}
        >
          {/* Subtle grid texture overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Top row: heading left, description right */}
          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10 sm:mb-14 items-start">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
              Discover the Impact of Volunteering
            </h2>
            <p className="text-white/80 text-base sm:text-lg sm:text-right leading-relaxed">
              Together, we can make a real impact in communities around the world. Help us bring hope and support.
            </p>
          </div>

          {/* Bottom row: feature cards left, image right */}
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 items-end">

            {/* Feature cards */}
            <div className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-card rounded-2xl px-6 py-5 flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <h4 className="font-semibold text-foreground text-base">{feature.title}</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: image + floating badges */}
            <div className="relative flex items-end justify-center lg:justify-end">

              {/* Watch our story reel pill — left of image */}
              <div className="absolute left-0 bottom-16 sm:bottom-24 z-20 flex items-center gap-3 bg-white dark:bg-card rounded-full pl-4 pr-2 py-2 shadow-md">
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  Watch our<br />story reel
                </span>
                <button
                  aria-label="Watch story reel"
                  className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                  <PlayIcon className="size-3.5 text-white ml-0.5" />
                </button>
              </div>

              {/* Real Lives Changed badge — top right of image */}
              <div className="absolute top-0 right-0 z-20">
                <Badge className="bg-white text-foreground hover:bg-white shadow-md text-xs font-medium px-4 py-2 rounded-full">
                  Real Lives Changed by Your Support
                </Badge>
              </div>

              {/* Volunteer image — greyscale with pink circle behind */}
              <div className="relative mt-8 lg:mt-0">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-white/20 blur-sm" />
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                  alt="Volunteers making an impact"
                  loading="lazy"
                  className="relative z-10 h-72 sm:h-96 w-auto object-cover object-top grayscale"
                  style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 20%)' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default VolunteerImpactSection