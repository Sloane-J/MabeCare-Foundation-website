import { Badge } from '@/components/ui/badge'

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
  </svg>
)

type Programme = {
  image: string
  alt: string
  category: string
  title: string
  description: string
}

const originalProgrammes: Programme[] = [
  {
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&q=80',
    alt: 'Mother receiving welfare support from MabEcare Foundation',
    category: 'Welfare',
    title: 'Mother and Child Welfare Fund',
    description:
      'Providing basic needs support, home visits, and care packages to vulnerable mothers and their children across our community.'
  },
  {
    image: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=600&q=80',
    alt: 'Women participating in a skills training workshop',
    category: 'Skills Training',
    title: 'Women Skills Training Programme',
    description:
      'Equipping mothers with practical vocational skills in trades like baking, sewing, and soap making to help them earn a sustainable income.'
  },
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    alt: 'Children supported through MabeCare outreach programme',
    category: 'Child Support',
    title: 'Children Outreach and Support',
    description:
      'Reaching children in underserved communities with educational materials, nutritional support, and a safe space to grow and learn.'
  }
]

const newProgrammes: Programme[] = [
  {
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=80',
    alt: 'Blood donation drive with medical volunteers',
    category: 'Blood Donation',
    title: 'Blood Donation Drive',
    description:
      'Organising community blood drives to ensure a steady, safe supply for mothers and newborns requiring emergency transfusions during and after childbirth.'
  },
  {
    image: 'https://images.unsplash.com/photo-1573495804664-b1c0849525af?w=600&q=80',
    alt: 'Mother receiving mental health counselling',
    category: 'Mental Health',
    title: 'Maternal Mental Health',
    description:
      'Providing counselling sessions, peer support groups, and community-based care to help mothers navigate postpartum depression, anxiety, and emotional burnout.'
  },
  {
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
    alt: 'Young children learning in an early education classroom',
    category: 'Education',
    title: 'Early Childhood Education',
    description:
      'Equipping children aged 0–6 with foundational learning through play-based programmes, trained caregivers, and access to educational materials.'
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1664477077517-61ed80da0d6e?w=600&q=80',
    alt: 'Child with special needs receiving dedicated support',
    category: 'Special Needs',
    title: 'Special Needs Children Welfare',
    description:
      'Supporting children with disabilities through adaptive care, therapy referrals, caregiver training, and advocacy for inclusive education and dignity.'
  }
]

const ProgrammeCard = ({ programme, imageHeight }: { programme: Programme; imageHeight: string }) => (
  <div className='border-border bg-card flex flex-col overflow-hidden rounded-3xl border transition-shadow duration-300 hover:shadow-md'>
    <div className='m-3 mb-0 overflow-hidden rounded-2xl'>
      <img src={programme.image} alt={programme.alt} loading='lazy' className={`w-full ${imageHeight} object-cover`} />
    </div>
    <div className='flex flex-col gap-3 p-5'>
      <Badge variant='outline' className='w-fit rounded-full px-3 py-1 text-xs font-normal'>
        {programme.category}
      </Badge>
      <div className='flex flex-col gap-1.5'>
        <h3 className='text-foreground text-base leading-snug font-normal'>{programme.title}</h3>
        <p className='text-muted-foreground text-sm leading-relaxed'>{programme.description}</p>
      </div>
    </div>
  </div>
)

const DonationProgramsSection = () => {
  return (
    <section id='donation-programmes' className='py-12 sm:py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16'>
          <Badge variant='outline' className='gap-2 px-4 py-1.5 text-sm font-normal'>
            <SparkleIcon className='text-primary size-4' />
            Our Programmes
          </Badge>
          <h2 className='text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl'>
            Make a meaningful <span className='text-primary'>donation</span> today
          </h2>
          <p className='text-muted-foreground max-w-xl text-base sm:text-lg'>
            Every contribution goes directly into the hands of mothers and children who need it most. Help us keep
            going.
          </p>
        </div>

        {/* Original 3 programmes — larger cards */}
        <div className='mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {originalProgrammes.map((programme, index) => (
            <ProgrammeCard key={index} programme={programme} imageHeight='h-52' />
          ))}
        </div>

        {/* New 4 programmes — slightly smaller cards */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {newProgrammes.map((programme, index) => (
            <ProgrammeCard key={index} programme={programme} imageHeight='h-40' />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DonationProgramsSection
