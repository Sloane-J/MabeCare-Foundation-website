import { Badge } from '@/components/ui/badge'

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const TimerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
)

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const ResultsSection = () => {
  return (
    <section id="our-results" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16">
          <Badge variant="outline" className="gap-2 text-sm font-normal px-4 py-1.5">
            <BellIcon className="size-4 text-primary" />
            Our results
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Results that inspire change
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            Together, we can make a real impact in communities around the world. Help us bring hope and support.
          </p>
        </div>

        {/* Body: image left, content right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">

          {/* Left — image with floating chart card */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&q=80"
                alt="Volunteers working together"
                loading="lazy"
                className="w-full h-[420px] sm:h-[500px] object-cover"
              />
            </div>

            {/* Floating donation chart card */}
            <div className="absolute bottom-6 right-4 sm:right-[-20px] bg-white dark:bg-card rounded-2xl shadow-lg p-5 w-52 sm:w-60">
              <p className="text-sm font-semibold text-foreground mb-0.5">Donation chart</p>
              <p className="text-xs text-muted-foreground mb-4">Donation received in past years</p>

              {/* Bar chart */}
              <div className="flex items-end gap-2 h-16">
                {[40, 55, 65, 80, 100].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${height}%`,
                        backgroundColor: i === 4 ? '#ff1493' : '#86efac',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Year labels */}
              <div className="flex gap-2 mt-2">
                {['2020', '2021', '2022', '2023', '2024'].map((yr) => (
                  <span key={yr} className="flex-1 text-center text-[10px] text-muted-foreground">{yr}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — text + stat cards */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Badge variant="outline" className="w-fit text-sm font-normal px-4 py-1.5">
                Empowering Education
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
                Building Brighter Futures Through Learning Opportunities
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Our commitment to education has enabled thousands of children and adults to gain the skills and knowledge they need to thrive.
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Schools Partnered */}
              <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-full bg-[#86efac] flex items-center justify-center">
                  <TimerIcon className="size-4 text-[#166534]" />
                </div>
                <p className="text-sm text-muted-foreground">Schools Partnered</p>
                <p className="text-3xl font-bold text-foreground">100+</p>
              </div>

              {/* Scholarships Awarded */}
              <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F5D547] flex items-center justify-center">
                  <AwardIcon className="size-4 text-[#713f12]" />
                </div>
                <p className="text-sm text-muted-foreground">Scholarships Awarded</p>
                <p className="text-3xl font-bold text-foreground">800+</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ResultsSection