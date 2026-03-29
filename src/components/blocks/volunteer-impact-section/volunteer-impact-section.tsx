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
        <div className="relative overflow-hidden rounded-3xl bg-[#f0fdf4] dark:bg-[#0f1f13] px-8 py-12 sm:px-12 sm:py-16">

          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Pink accent blob — very subtle, top right */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          {/* Top row: heading left, description right */}
          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10 sm:mb-14 items-start">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-snug">
              Discover the Impact of Volunteering
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg sm:text-right leading-relaxed">
              Together, we can make a real impact in communities around the world. Help us bring hope and support.
            </p>
          </div>

          {/* Bottom row: feature cards left, image right */}
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">

            {/* Feature cards */}
            <div className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-card rounded-2xl px-6 py-5 flex flex-col gap-2 shadow-sm border border-border"
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

            {/* Right: image + floating elements */}
            <div className="relative flex items-end justify-center lg:justify-end">

              {/* Watch story reel pill */}
              <div className="absolute left-0 bottom-8 z-20 flex items-center gap-3 bg-white dark:bg-card rounded-full pl-4 pr-2 py-2 shadow-md border border-border">
                <span className="text-sm font-medium text-foreground whitespace-nowrap leading-tight">
                  Watch our<br />story reel
                </span>
                <button
                  aria-label="Watch story reel"
                  className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                  <PlayIcon className="size-3.5 text-background ml-0.5" />
                </button>
              </div>

              {/* Real Lives Changed badge */}
              <div className="absolute top-4 right-0 z-20">
                <Badge
                  variant="outline"
                  className="bg-white dark:bg-card text-foreground shadow-md text-xs font-medium px-4 py-2 rounded-full border-border"
                >
                  Real Lives Changed by Your Support
                </Badge>
              </div>

              {/* Image */}
              <div className="relative mt-8 lg:mt-0 w-full">
                <img
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&q=80"
                  alt="Volunteers making a difference in the community"
                  loading="lazy"
                  className="relative z-10 w-full h-72 sm:h-96 object-cover rounded-2xl"
                  style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}
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