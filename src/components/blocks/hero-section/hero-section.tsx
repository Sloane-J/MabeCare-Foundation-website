'use client'

import { ArrowRightIcon, PlayCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type MenuData = {
  id: number
  img: string
  imgAlt: string
  userAvatar: string
  userComment: string
}

const HeroSection = ({ menudata }: { menudata: MenuData[] }) => {
  const heroImage = menudata[0]

  return (
    <section
      id='home'
      className='relative overflow-visible pt-24 pb-16 lg:pt-40'
    >
      {/* Subtle shimmer */}
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_40%,var(--color-primary)_0%,transparent_100%)] opacity-[0.04]' />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-12'>

          {/* LEFT CONTENT */}
          <div className='flex flex-col gap-6'>

            {/* Donor Badge */}
            <div className='flex items-center gap-2'>
              <div className='flex -space-x-2'>
                {menudata.slice(0, 3).map((user) => (
                  <img
                    key={user.id}
                    src={user.userAvatar}
                    className='h-8 w-8 rounded-full border-2 border-background'
                    alt="Donor"
                  />
                ))}
              </div>
              <span className='text-sm text-muted-foreground'>
                1000+ Donor active members
              </span>
            </div>

            {/* HEADLINE (NOT BOLD) */}
            <h1 className='text-4xl font-md leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl'>
              Together for <br />
              making a <span className='text-primary'>brighter</span> future
            </h1>

            <p className='max-w-lg text-lg text-muted-foreground'>
              Together, we can make a real impact in communities all over Ghana.
              Help us bring hope and support to those who need it most.
            </p>

            {/* CTA */}
            <div className='flex flex-wrap items-center gap-6'>
            
              {/* Donate CTA (Pill + Separate Arrow) */}
              <div className='group flex items-center gap-0'>
                {/* Pill Button */}
                <a
                  href='donate'
                  className='rounded-full bg-foreground px-8 py-4 text-lg font-semibold text-background transition-all hover:bg-foreground/90'
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
                className='px-4 py-4 text-lg font-semibold text-foreground'
              >
                Join Us As A Volunteer
              </a>
              */}
            
            </div>

            {/* Partners */}
            <div className='mt-10 pt-6'>
              <p className='text-xs uppercase tracking-wider text-muted-foreground/60 mb-4'>
                our beloved partners
              </p>
              <div className='flex gap-6 opacity-40 grayscale text-sm'>
                <span>GoCart MotherCare</span>
                <span>Anloga Junction</span>
                <span>Sloane Developers</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className='relative h-[600px] lg:h-[720px]'>

            {/* IMAGE pushed into header */}
            <div className='absolute -top-24 right-0 w-full h-full z-10'>
              <div className='relative h-full w-full overflow-hidden rounded-[2.5rem]'>
                <img
                  src={heroImage.img}
                  alt={heroImage.imgAlt}
                  className='h-full w-full object-cover'
                />

                {/* Floating testimonial */}
                <div className='absolute top-10 left-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-[260px]'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={heroImage.userAvatar}
                      className='h-10 w-10 rounded-full'
                      alt="User"
                    />
                    <p className='text-xs'>
                      "{heroImage.userComment.substring(0, 90)}..."
                    </p>
                  </div>
                </div>

                {/* Watch button */}
                <button className='absolute inset-0 flex items-center justify-center group'>
                  <div className='flex items-center gap-3 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl'>
                    <span className='text-sm'>Watch story</span>
                    <PlayCircleIcon className='h-8 w-8 transition group-hover:scale-110' />
                  </div>
                </button>

                {/* Bottom card */}
                <div className='absolute bottom-6 right-6 bg-background backdrop-blur-sm rounded-3xl p-4 shadow-xl w-56'>
                  <h4 className='text-sm mb-1'>Dedicated team</h4>
                  <p className='text-[10px] text-muted-foreground mb-3'>
                    Providing essential resources and aid.
                  </p>
                  <div className='flex justify-between items-center'>
                    <div className='flex -space-x-2'>
                      <div className='h-5 w-5 rounded-full bg-pink-200 border border-background' />
                      <div className='h-5 w-5 rounded-full bg-blue-200 border border-background' />
                      <div className='h-5 w-5 rounded-full bg-yellow-200 border border-background' />
                    </div>
                    <span className='text-sm'>50K</span>
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