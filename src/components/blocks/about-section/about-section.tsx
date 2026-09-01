import CallToAction from '@/components/blocks/call-to-action/call-to-action'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// — Icons —
const AboutIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='12' cy='12' r='10' />
    <line x1='12' y1='8' x2='12' y2='12' />
    <line x1='12' y1='16' x2='12.01' y2='16' />
  </svg>
)

const ImpactIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
  </svg>
)

const TeamIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
    <circle cx='9' cy='7' r='4' />
    <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
  </svg>
)

const EmpathyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
  </svg>
)

const SustainIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M12 22V12' />
    <path d='M12 12C12 12 7 9 7 5a5 5 0 0 1 10 0c0 4-5 7-5 7z' />
  </svg>
)

const CollabIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='18' cy='5' r='3' />
    <circle cx='6' cy='12' r='3' />
    <circle cx='18' cy='19' r='3' />
    <line x1='8.59' y1='13.51' x2='15.42' y2='17.49' />
    <line x1='15.41' y1='6.51' x2='8.59' y2='10.49' />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </svg>
)

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
    <polyline points='22,6 12,13 2,6' />
  </svg>
)

// — Data —
const values = [
  {
    icon: <EmpathyIcon className='size-5 text-white' />,
    iconBg: 'bg-[#4ade80]',
    title: 'Empathy',
    description: 'We approach each community with respect, listening to their stories and understanding their needs.'
  },
  {
    icon: <SustainIcon className='size-5 text-white' />,
    iconBg: 'bg-[#facc15]',
    title: 'Sustainability',
    description: 'Transparency and accountability are at the heart of MabEcare. We are committed to lasting change.'
  },
  {
    icon: <CollabIcon className='size-5 text-white' />,
    iconBg: 'bg-primary',
    title: 'Collaboration',
    description: 'We believe change is a collective effort. By working hand-in-hand with local communities, we go further.'
  },
]

const impacts = [
  { stat: '5K+', label: 'Mothers supported from across Ghana' },
  { stat: '300+', label: 'Outreach programs completed' },
  { stat: '10K+', label: 'Individuals directly impacted' },
  { stat: '₵2M+', label: 'Raised to support health and education' }
]

const team = [
  {
    name: 'Miss Joana Ewurama Sarfoa Yirenkyi',
    role: 'Founder',
    image: '/images/about-us/Joanna Yirenkyi.jpg',
    twitter: '#',
    linkedin: 'https://www.linkedin.com/in/joana-yirenkyi-019a55385',
    email: 'mailto:jhaycraig.ama@gmail.com'
  },
  {
    name: 'Miss Joanitta Yirenkyi',
    role: 'Executive Director',
    image: '/images/about-us/Joannita Yirenky.jpg',
    twitter: '#',
    linkedin: '#',
    email: 'mailto:joanitta071@gmail.com'
  },
  {
    name: 'Dr. Amu Hubert (PhD)',
    role: 'Patron & Chairperson of Advisory Board',
    image: '/images/about-us/dr-amu-hubert.jpg',
    twitter: '#',
    linkedin: 'https://www.linkedin.com/in/hubert-amu-phd-a0a43892/',
    email: 'mailto:#'
  },
  {
    name: 'Kofi Darko',
    role: 'Finance & Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    twitter: '#',
    linkedin: '#',
    email: 'mailto:#'
  }
]

// — Component —
const AboutSection = () => {
  return (
    <div id='about' className='flex flex-col'>
      {/* ── 1. MISSION / HERO ── */}
      <section aria-labelledby='about-heading' className='py-12 sm:py-20 lg:py-28'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-2'>
            <div className='flex flex-col gap-4'>
              <Badge variant='outline' className='w-fit gap-2 px-4 py-1.5 text-sm font-normal'>
                <AboutIcon className='text-primary size-4' />
                About Us
              </Badge>
              <h2 id='about-heading' className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'>
                Know about our mission, vision, and journey
              </h2>
            </div>
            <div className='flex flex-col gap-5 lg:pt-16'>
              <p className='text-muted-foreground text-base leading-relaxed sm:text-lg'>
                Together, we can make a real impact in communities around the world. Help us bring hope and support to
                every mother and child in Ghana.
              </p>
              <Button asChild className='bg-foreground text-background hover:bg-foreground/90 w-fit rounded-full px-8'>
                <a href='#donation-programs'>Learn More</a>
              </Button>
            </div>
          </div>

          <div className='overflow-hidden rounded-3xl'>
            <img
              src='/images/about-us/about-us-banner.jpg'
              alt='Donation packages being prepared for communities in need'
              className='h-64 w-full object-cover sm:h-80 lg:h-[480px]'
              loading='lazy'
            />
          </div>
        </div>
      </section>

      {/* ── 2. VALUES ── */}
      <section aria-labelledby='values-heading' className='pb-12 sm:pb-20 lg:pb-28'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='border-border overflow-hidden rounded-2xl border'>
            <div className='divide-border grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
              {values.map((value, i) => (
                <div key={i} className='flex flex-col items-center gap-4 p-8 text-center sm:p-10'>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${value.iconBg}`}>
                    {value.icon}
                  </div>
                  <h3 className='text-foreground text-base font-semibold'>{value.title}</h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. IMPACT STATS ── */}
      <section aria-labelledby='impact-heading' className='pb-12 sm:pb-20 lg:pb-28'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 flex flex-col items-center gap-4 text-center'>
            <Badge variant='outline' className='gap-2 px-4 py-1.5 text-sm font-normal'>
              <ImpactIcon className='text-primary size-4' />
              Our Impacts
            </Badge>
            <h2 id='impact-heading' className='max-w-2xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'>
              Since our founding, MabEcare has made an extensive impact
            </h2>
          </div>

          <div className='rounded-3xl bg-[#F5D547] px-8 py-10 sm:px-12 sm:py-12'>
            <div className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
              {impacts.map((item, i) => (
                <div key={i} className='flex flex-col gap-2'>
                  <span className='text-3xl font-bold text-[#0a0a0a] sm:text-4xl'>{item.stat}</span>
                  <span className='text-sm leading-snug text-[#0a0a0a]/70'>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MISSION + CHART ── */}
      <section aria-labelledby='mission-heading' className='pb-12 sm:pb-20 lg:pb-28'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
            <div className='relative'>
              <div className='overflow-hidden rounded-3xl'>
                <img
                  src='https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&q=80'
                  alt='MabEcare volunteers working together in the community'
                  className='h-[400px] w-full object-cover sm:h-[480px]'
                />
              </div>

              <div className='dark:bg-card absolute right-4 bottom-6 w-52 rounded-2xl bg-white p-5 shadow-lg sm:right-[-20px] sm:w-60'>
                <p className='text-foreground mb-0.5 text-sm font-semibold'>Donation chart</p>
                <p className='text-muted-foreground mb-4 text-xs'>Donations received in past years</p>
                <div className='flex h-16 items-end gap-2'>
                  {[35, 50, 65, 80, 100].map((h, i) => (
                    <div key={i} className='flex-1'>
                      <div
                        className='w-full rounded-t-sm'
                        style={{ height: `${h}%`, backgroundColor: i === 4 ? '#ff1493' : '#86efac' }}
                      />
                    </div>
                  ))}
                </div>
                <div className='mt-2 flex gap-2'>
                  {['2020', '2021', '2022', '2023', '2024'].map(yr => (
                    <span key={yr} className='text-muted-foreground flex-1 text-center text-[10px]'>
                      {yr}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-6'>
              <Badge variant='outline' className='w-fit px-4 py-1.5 text-sm font-normal'>
                Our Mission
              </Badge>
              <h3 id='mission-heading' className='text-2xl leading-snug font-bold sm:text-3xl'>
                MabEcare's work is made possible by a dedicated community
              </h3>
              <p className='text-muted-foreground text-base leading-relaxed'>
                We value transparency and keep our supporters informed about the tangible outcomes of their
                contributions. Together, we are creating a powerful movement of compassion and action across Ghana.
              </p>
              <Button asChild className='bg-foreground text-background hover:bg-foreground/90 w-fit rounded-full px-8'>
                <a href='#donate'>Make A Quick Donation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TEAM ── */}
      <section aria-labelledby='team-heading' className='pb-12 sm:pb-20 lg:pb-28'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 flex flex-col items-center gap-4 text-center'>
            <Badge variant='outline' className='gap-2 px-4 py-1.5 text-sm font-normal'>
              <TeamIcon className='text-primary size-4' />
              Our Team
            </Badge>
            <h2 id='team-heading' className='text-3xl font-bold tracking-tight md:text-4xl'>
              Meet our incredible team
            </h2>
            <p className='text-muted-foreground max-w-xl text-base sm:text-lg'>
              Together, we can make a real impact in communities around the world. Help us bring hope and support.
            </p>
          </div>

          <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
            {team.map((member, i) => (
              <div key={i} className='flex flex-col items-center gap-3'>
                {/* Image with hover overlay */}
                <div className='group bg-muted relative aspect-[3/4] w-full overflow-hidden rounded-2xl'>
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role} at MabEcare Foundation`}
                    className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
                    loading='lazy'
                  />

                  {/* Overlay — slides up on hover */}
                  <div className='absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0'>
                    <div className='bg-gradient-to-t from-black/80 to-black/40 px-4 py-5'>
                      <div className='flex items-center justify-center gap-3'>
                        <a
                          href={member.twitter}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`${member.name} on X (Twitter)`}
                          className='flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25'
                        >
                          <XIcon className='size-3.5' />
                        </a>

                        <a
                          href={member.linkedin}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`${member.name} on LinkedIn`}
                          className='flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25'
                        >
                          <LinkedInIcon className='size-3.5' />
                        </a>

                        <a
                          href={member.email}
                          aria-label={`Email ${member.name}`}
                          className='flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25'
                        >
                          <MailIcon className='size-3.5' />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name and role below image */}
                <div className='text-center'>
                  <p className='text-foreground text-sm font-semibold'>{member.name}</p>
                  <p className='text-muted-foreground text-xs'>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <CallToAction />
    </div>
  )
}

export default AboutSection
