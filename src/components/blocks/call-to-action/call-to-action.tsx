import { Button } from '@/components/ui/button'

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='5' y1='12' x2='19' y2='12' />
    <polyline points='12 5 19 12 12 19' />
  </svg>
)

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
  </svg>
)

const stats = [
  { value: '200+', label: 'Mothers Supported' },
  { value: '150+', label: 'Women in Training' },
  { value: '300+', label: 'Children Reached' }
]

const CallToAction = () => {
  return (
    <section id='cta' className='py-12 sm:py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='relative overflow-hidden rounded-3xl bg-[#0a0a0a] dark:bg-[#111]'>
          {/* Pink glow — top left */}
          <div className='bg-primary/30 pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl' />
          {/* Pink glow — bottom right */}
          <div className='bg-primary/20 pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl' />

          {/* Dot grid texture */}
          <div
            className='pointer-events-none absolute inset-0 opacity-[0.04]'
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: '28px 28px'
            }}
          />

          <div className='relative z-10 grid grid-cols-1 gap-0 lg:grid-cols-2'>
            {/* Left — text content */}
            <div className='flex flex-col justify-center gap-8 px-8 py-14 sm:px-14 sm:py-16'>
              {/* Eyebrow */}
              <div className='flex items-center gap-2'>
                <HeartIcon className='text-primary size-4' />
                <span className='text-primary text-sm font-normal tracking-widest uppercase'>Make an impact</span>
              </div>

              {/* Heading */}
              <h2 className='text-3xl leading-tight font-normal text-white sm:text-4xl lg:text-5xl'>
                Together, we can
                <br />
                <span className='text-primary'>change lives</span>
                <br />
                for good.
              </h2>

              {/* Subtext */}
              <p className='max-w-md text-base leading-relaxed text-white/60 sm:text-lg'>
                Every donation and every hour you give helps a mother gain skills, meet her basic needs, and build a
                better life for her children.
              </p>

              {/* CTAs */}
              <div className='flex flex-wrap gap-3'>
                <Button className='bg-primary hover:bg-primary/90 gap-2 rounded-full px-8 py-5 text-sm font-normal text-white'>
                  Donate Now
                  <ArrowRightIcon className='size-4' />
                </Button>
                <Button
                  variant='outline'
                  className='bg-foreground border-primary/20 rounded-full px-8 py-5 text-sm font-normal text-white hover:border-white/40 hover:bg-white/10 hover:text-white'
                >
                  Become A Volunteer
                </Button>
              </div>

              {/* Stats row */}
              <div className='flex flex-wrap gap-8 border-t border-white/10 pt-4'>
                {stats.map((stat, i) => (
                  <div key={i} className='flex flex-col gap-1'>
                    <span className='text-2xl font-normal text-white'>{stat.value}</span>
                    <span className='text-xs tracking-wider text-white/50 uppercase'>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image collage */}
            <div className='relative hidden min-h-[480px] items-end justify-end overflow-hidden lg:flex'>
              {/* Large main image */}
              <img
                src='https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80'
                alt='Volunteers in the community'
                loading='lazy'
                className='absolute inset-0 h-full w-full object-cover opacity-40'
                style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%)' }}
              />

              {/* Floating card — top right */}
              <div className='absolute top-10 right-8 max-w-[180px] rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md'>
                <p className='text-xs leading-snug text-white opacity-80'>
                  Supporting mothers and children to grow, thrive, and build brighter futures together.
                </p>
              </div>

              {/* Floating avatar stack card — bottom left */}
              <div className='absolute bottom-10 left-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md'>
                <div className='flex -space-x-2'>
                  {[
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
                    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt='Volunteer'
                      loading='lazy'
                      className='h-8 w-8 rounded-full border-2 border-white/20 object-cover grayscale'
                    />
                  ))}
                </div>
                <div>
                  <p className='text-sm font-normal text-white'>200+ Mothers</p>
                  <p className='text-xs text-white/50'>supported so far</p>
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
