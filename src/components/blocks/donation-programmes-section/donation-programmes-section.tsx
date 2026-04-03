import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
)

type Programme = {
  image: string
  alt: string
  category: string
  daysLeft: number
  title: string
  description: string
  goal: string
  raised: string
}

const programmes: Programme[] = [
  {
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&q=80',
    alt: 'Mother receiving welfare support from MabeCare Foundation',
    category: 'Welfare',
    daysLeft: 60,
    title: 'Mother and Child Welfare Fund',
    description: 'Providing basic needs support, home visits, and care packages to vulnerable mothers and their children across our community.',
    goal: '₵15,000',
    raised: '₵6,200',
  },
  {
    image: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=600&q=80',
    alt: 'Women participating in a skills training workshop',
    category: 'Skills Training',
    daysLeft: 45,
    title: 'Women Skills Training Programme',
    description: 'Equipping mothers with practical vocational skills in trades like baking, sewing, and soap making to help them earn a sustainable income.',
    goal: '₵10,000',
    raised: '₵4,500',
  },
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    alt: 'Children supported through MabeCare outreach programme',
    category: 'Child Support',
    daysLeft: 90,
    title: 'Children Outreach and Support',
    description: 'Reaching children in underserved communities with educational materials, nutritional support, and a safe space to grow and learn.',
    goal: '₵8,000',
    raised: '₵2,800',
  },
]

const DonationProgramsSection = () => {
  return (
    <section id="donation-programmes" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16">
          <Badge variant="outline" className="gap-2 text-sm font-normal px-4 py-1.5">
            <SparkleIcon className="size-4 text-primary" />
            Our Programmes
          </Badge>
          <h2 className="text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl">
            Make a meaningful <span className='text-primary'>donation</span> today
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            Every contribution goes directly into the hands of mothers and children who need it most. Help us keep going.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((programme, index) => (
            <div
              key={index}
              className="flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl m-3 mb-0">
                <img
                  src={programme.image}
                  alt={programme.alt}
                  loading="lazy"
                  className="w-full h-52 object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-6">

                {/* Category + Days left */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-normal px-3 py-1 rounded-full">
                    {programme.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{programme.daysLeft} Days Left</span>
                </div>

                {/* Title + Description */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-normal text-foreground leading-snug">
                    {programme.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {programme.description}
                  </p>
                </div>

                {/* Goal + Raised */}
                <div className="flex items-start justify-between pt-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Goal</span>
                    <span className="text-lg font-normal text-foreground">{programme.goal}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-xs text-muted-foreground">Raised</span>
                    <span className="text-lg font-normal text-primary">{programme.raised}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.round(
                        (parseFloat(programme.raised.replace(/[₵,]/g, '')) /
                          parseFloat(programme.goal.replace(/[₵,]/g, ''))) *
                          100
                      )}%`,
                    }}
                  />
                </div>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className="w-full mt-1 rounded-xl border-border hover:border-primary hover:text-primary transition-colors"
                >
                  View Programme
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default DonationProgramsSection