'use client'

//import { Button } from '@/components/ui/button'

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export type MenuData = {
  id: number
  img: string
  imgAlt: string
  userAvatar: string
  userComment: string
}

const HeroSection = ({ menudata }: { menudata: MenuData[] }) => {
  const heroImage = menudata?.[0]

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative overflow-hidden pt-24 pb-16 lg:pt-40"
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_40%,var(--color-primary)_0%,transparent_100%)] opacity-[0.04]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

          {/* LEFT */}
          <div className="flex flex-col gap-6">

            {/* Avatars */}
            {/*<div className="flex items-center gap-3">
              <div className="flex -space-x-2" role="list" aria-label="Donor avatars">
                {menudata?.slice(0, 3).map((user) => (
                  <img
                    key={user.id}
                    src={user.userAvatar}
                    className="h-8 w-8 rounded-full border-2 border-background object-cover"
                    alt="Donor member"
                    role="listitem"
                    loading="lazy"
                    width={32}
                    height={32}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                1,000+ active donor members
              </span>
            </div>*/}

            {/* Heading */}
            <h1 className="text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Empowering mothers,
              <br />
              nurturing every
              <br />
              <span className="text-primary">child's</span> future
            </h1>

                       <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
                                     MabeCare Foundation supports mothers and children across Ghana through welfare programs, skills training, and community care — because every family deserves the chance to thrive.
                                   </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <div className='group flex items-center gap-0'>
                              {/* Pill Button */}
                              <a
                                href='donate'
                                className='rounded-full bg-foreground px-8 py-4 text-lg font-normal text-background transition-all hover:bg-foreground/90'
                              >
                                Donate Now
                              </a>

                              {/* Separate Arrow Circle */}
                              <span className='flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background transition-all border-l border-background/10'>
                                <ArrowRightIcon className='h-6 w-6 transition-transform duration-300 group-hover:-rotate-45' />
                              </span>
                            </div>

                            {/* Volunteer CTA (Text Only - No Background)
                            <a
                              href='#volunteer'
                              className='px-4 py-4 text-lg font-normal text-foreground'
                            >
                              Join Us As A Volunteer
                            </a>
                            */}

                          </div>

            {/* Partners */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-4">
                Our Beloved Partners
              </p>
              <div
                className="flex flex-wrap gap-6 opacity-40 grayscale text-sm text-foreground"
                
              >
                <span>GoCart MotherCare</span>
                <span>Anloga Junction</span>
                <span>Sloane Developers</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative h-[520px] sm:h-[600px] lg:h-[720px]">
            <div className="absolute -top-24 right-0 w-full h-full z-10">
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem]">

                {/* Hero image */}
                {heroImage && (
                  <img
                    src={heroImage.img}
                    alt={heroImage.imgAlt || 'Hero image'}
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                )}

                {/* Testimonial */}
                {heroImage && (
                  <figure
                    className="absolute top-8 left-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-[260px]"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={heroImage.userAvatar}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                        alt="Donor"
                        loading="lazy"
                        width={40}
                        height={40}
                      />
                      <blockquote className="text-xs text-foreground leading-relaxed">
                        "{heroImage.userComment.substring(0, 60)}..."
                      </blockquote>
                    </div>
                  </figure>
                )}

                {/* Bottom card */}
                <div className="absolute bottom-6 right-6 bg-background/95 backdrop-blur-sm rounded-3xl p-4 shadow-xl w-56">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    Growing Together
                  </h4>
                  <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
                    Skills, support, and community for every mother and child.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="h-5 w-5 rounded-full bg-pink-200 border border-background" />
                      <div className="h-5 w-5 rounded-full bg-blue-200 border border-background" />
                      <div className="h-5 w-5 rounded-full bg-yellow-200 border border-background" />
                    </div>
                    <span className="text-sm font-normal text-foreground">10K+</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
