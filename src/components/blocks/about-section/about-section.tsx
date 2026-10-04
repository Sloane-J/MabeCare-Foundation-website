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

const TeamIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
    <circle cx='9' cy='7' r='4' />
    <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
  </svg>
)

const HeartIcon = ({ className }: { className?: string }) => (
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

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M5 12h14' />
    <path d='m13 6 6 6-6 6' />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 24 0 22.222 0h.003z' />
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
    icon: <HeartIcon className='size-5 text-white' />,
    iconBg: 'bg-[#4ade80]',
    title: 'Empathy',
    description:
      'We approach each community with respect, listening to their stories and understanding their needs. Every initiative begins with people, not assumptions.'
  },
  {
    icon: <SustainIcon className='size-5 text-white' />,
    iconBg: 'bg-[#facc15]',
    title: 'Sustainability',
    description:
      'Transparency and accountability are at the heart of MabEcare. We focus on solutions that create meaningful and lasting benefits for families and communities.'
  },
  {
    icon: <CollabIcon className='size-5 text-white' />,
    iconBg: 'bg-primary',
    title: 'Collaboration',
    description:
      'We believe change is a collective effort. By working hand-in-hand with communities, volunteers, partners, and supporters, we can go further together.'
  }
]

const focusAreas = [
  {
    number: '01',
    title: 'Maternal Health & Wellbeing',
    description:
      'Supporting mothers through pregnancy, childbirth, postpartum care, mental wellness, reproductive health education, and access to essential resources.',
    image: '/images/programmes/post-maternal-care.webp'
  },
  {
    number: '02',
    title: 'Women’s Empowerment',
    description:
      'Equipping women with practical vocational skills and opportunities that can strengthen their independence, confidence, and ability to provide for their families.',
    image: '/images/programmes/women-skill-training.webp'
  },
  {
    number: '03',
    title: 'Child Welfare & Education',
    description:
      'Supporting children in underserved communities through education, nutrition, learning resources, advocacy, and opportunities for healthy development.',
    image: '/images/programmes/child-education.webp'
  },
  {
    number: '04',
    title: 'Community Outreach',
    description:
      'Taking essential support directly into communities through relief drives, health initiatives, blood donation campaigns, and other grassroots programs.',
    image: '/images/programmes/donation-drives.jpg'
  }
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
    email: '#'
  }
]

// — Component —
const AboutSection = () => {
  return (
    <div id='about' className='flex flex-col'>
      {/* ── 1. HERO ── */}
      <section aria-labelledby='about-heading' className='py-12 sm:py-20 lg:py-28'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-2'>
            <div className='flex flex-col gap-4'>
              <Badge
                variant='outline'
                className='w-fit gap-2 px-4 py-1.5 text-sm font-normal'
              >
                <AboutIcon className='size-4 text-primary' />
                About Us
              </Badge>

              <h1
                id='about-heading'
                className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'
              >
                Know about our mission, vision, and journey
              </h1>
            </div>

            <div className='flex flex-col gap-5 lg:pt-16'>
              <p className='text-base leading-relaxed text-muted-foreground sm:text-lg'>
                Together, we can make a real impact in communities around the
                world. Help us bring hope and support to every mother and child
                in Ghana.
              </p>

              <Button
                asChild
                className='w-fit rounded-full bg-foreground px-8 text-background hover:bg-foreground/90'
              >
                <a href='#our-work'>Learn More</a>
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
      <section
        aria-labelledby='values-heading'
        className='pb-14 sm:pb-20 lg:pb-24'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-10 max-w-2xl'>
            <Badge
              variant='outline'
              className='mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary'
            >
              What Guides Us
            </Badge>

            <h2
              id='values-heading'
              className='text-3xl font-semibold tracking-tight sm:text-4xl'
            >
              The values behind every initiative
            </h2>

            <p className='mt-3 text-base leading-relaxed text-muted-foreground'>
              Our work is grounded in how we treat people, how we use
              resources, and how we build relationships with the communities
              we serve.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
            {values.map((value, i) => (
              <div
                key={i}
                className='group rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-7'
              >
                <div
                  className={`mb-6 flex size-11 items-center justify-center rounded-xl ${value.iconBg}`}
                >
                  {value.icon}
                </div>

                <h3 className='text-lg font-semibold text-foreground'>
                  {value.title}
                </h3>

                <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MISSION & VISION ── */}
      <section
        aria-labelledby='mission-heading'
        className='pb-14 sm:pb-20 lg:pb-24'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='overflow-hidden rounded-3xl bg-slate-50 dark:bg-zinc-900'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <div className='relative min-h-[420px]'>
                <img
                  src='/images/about-us/about-us-banner.jpg'
                  alt='MabEcare community support work'
                  className='absolute inset-0 size-full object-cover'
                  loading='lazy'
                />

                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent' />

                <div className='absolute bottom-7 left-7 right-7 text-white'>
                  <p className='text-xs font-medium uppercase tracking-[0.18em] text-white/70'>
                    Why we exist
                  </p>

                  <p className='mt-2 max-w-md text-2xl font-semibold leading-tight'>
                    Healthier families begin with communities that care.
                  </p>
                </div>
              </div>

              <div className='flex flex-col justify-center p-7 sm:p-10 lg:p-14'>
                <Badge
                  variant='outline'
                  className='w-fit rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary'
                >
                  Our Mission
                </Badge>

                <h2
                  id='mission-heading'
                  className='mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl'
                >
                  Supporting people through care, opportunity, and action.
                </h2>

                <p className='mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base'>
                  MabEcare exists to support mothers, children, and families
                  through practical programs that respond to real needs in
                  communities across Ghana.
                </p>

                <p className='mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base'>
                  Our work brings together healthcare support, education,
                  empowerment, welfare, outreach, and community participation
                  to help create healthier and more resilient communities.
                </p>

                <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='rounded-2xl border border-border/70 bg-background p-5'>
                    <p className='text-xs font-semibold uppercase tracking-wider text-primary'>
                      Mission
                    </p>
                    <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                      Improve the wellbeing of mothers, children, and families
                      through meaningful community support.
                    </p>
                  </div>

                  <div className='rounded-2xl border border-border/70 bg-background p-5'>
                    <p className='text-xs font-semibold uppercase tracking-wider text-primary'>
                      Vision
                    </p>
                    <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                      Help build communities where families have the support
                      and opportunities they need to thrive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE DO ── */}
      <section
        id='our-work'
        aria-labelledby='work-heading'
        className='pb-14 sm:pb-20 lg:pb-24'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <Badge
                variant='outline'
                className='mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary'
              >
                Our Work
              </Badge>

              <h2
                id='work-heading'
                className='text-3xl font-semibold tracking-tight sm:text-4xl'
              >
                Where care becomes action
              </h2>
            </div>

            <p className='max-w-md text-sm leading-relaxed text-muted-foreground lg:text-right'>
              From maternal wellbeing to child development and women’s
              empowerment, our programs focus on practical support that can
              make a difference in everyday lives.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            {focusAreas.map((area) => (
              <div
                key={area.number}
                className='group overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
              >
                <div className='relative h-56 overflow-hidden'>
                  <img
                    src={area.image}
                    alt={area.title}
                    className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
                    loading='lazy'
                  />

                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />

                  <span className='absolute bottom-4 left-4 text-xs font-semibold text-white'>
                    {area.number}
                  </span>
                </div>

                <div className='p-6'>
                  <h3 className='text-lg font-semibold text-foreground'>
                    {area.title}
                  </h3>

                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                    {area.description}
                  </p>

                  <a
                    href='#donation-programs'
                    className='mt-5 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80'
                  >
                    Explore our programs
                    <ArrowIcon className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. OUR APPROACH ── */}
      <section
        aria-labelledby='approach-heading'
        className='pb-14 sm:pb-20 lg:pb-24'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='rounded-3xl border border-border/70 bg-card p-6 sm:p-8 lg:p-12'>
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16'>
              <div>
                <Badge
                  variant='outline'
                  className='rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary'
                >
                  Our Approach
                </Badge>

                <h2
                  id='approach-heading'
                  className='mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl'
                >
                  Listen. Understand. Act. Grow.
                </h2>

                <p className='mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base'>
                  Meaningful community work starts by understanding the people
                  at the centre of it. We listen to experiences, identify
                  needs, mobilize support, and work with communities to create
                  practical responses.
                </p>

                <Button
                  asChild
                  className='mt-6 rounded-full px-6'
                >
                  <a href='/contact'>
                    Work With Us
                    <ArrowIcon className='ml-2 size-4' />
                  </a>
                </Button>
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                {[
                  {
                    title: 'Listen',
                    text: 'We pay attention to the experiences and priorities of the communities we serve.'
                  },
                  {
                    title: 'Understand',
                    text: 'We learn about the challenges affecting mothers, children, and families.'
                  },
                  {
                    title: 'Act',
                    text: 'We turn resources and partnerships into practical programs and direct support.'
                  },
                  {
                    title: 'Grow',
                    text: 'We learn from every initiative and continue building stronger community solutions.'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className='rounded-2xl bg-muted/40 p-5'
                  >
                    <span className='text-xs font-semibold text-primary'>
                      0{i + 1}
                    </span>

                    <h3 className='mt-3 text-base font-semibold'>
                      {item.title}
                    </h3>

                    <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TEAM ── */}
      <section
        aria-labelledby='team-heading'
        className='pb-14 sm:pb-20 lg:pb-24'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-10 flex flex-col items-center text-center'>
            <Badge
              variant='outline'
              className='gap-2 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary'
            >
              <TeamIcon className='size-4' />
              Our Team
            </Badge>

            <h2
              id='team-heading'
              className='mt-4 text-3xl font-semibold tracking-tight sm:text-4xl'
            >
              The people behind MabEcare
            </h2>

            <p className='mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base'>
              Dedicated people working together to turn compassion, resources,
              and community action into meaningful support.
            </p>
          </div>

          <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3'>
            {team.map((member, i) => (
              <div key={i} className='group'>
                <div className='relative aspect-[4/4.7] overflow-hidden rounded-2xl bg-muted'>
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role} at MabEcare Foundation`}
                    className='size-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
                    loading='lazy'
                  />

                  <div className='absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/85 to-transparent px-4 pb-5 pt-14 transition-transform duration-300 group-hover:translate-y-0'>
                    <div className='flex justify-center gap-2'>
                      {member.twitter !== '#' && (
                        <a
                          href={member.twitter}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`${member.name} on X`}
                          className='flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
                        >
                          <XIcon className='size-3.5' />
                        </a>
                      )}

                      {member.linkedin !== '#' && (
                        <a
                          href={member.linkedin}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`${member.name} on LinkedIn`}
                          className='flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
                        >
                          <LinkedInIcon className='size-3.5' />
                        </a>
                      )}

                      {member.email !== '#' && (
                        <a
                          href={member.email}
                          aria-label={`Email ${member.name}`}
                          className='flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
                        >
                          <MailIcon className='size-3.5' />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className='mt-4'>
                  <p className='text-sm font-semibold text-foreground'>
                    {member.name}
                  </p>
                  <p className='mt-1 text-xs text-muted-foreground'>
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <CallToAction />
    </div>
  )
}

export default AboutSection