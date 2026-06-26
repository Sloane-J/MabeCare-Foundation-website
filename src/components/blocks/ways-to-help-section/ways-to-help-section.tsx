import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
)

const BankIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
)

const CardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
)

const GiftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

type WayToHelp = {
  icon: React.ReactNode
  iconBg: string
  title: string
  description: string
  cta: string
  href: string
}

const ways: WayToHelp[] = [
  {
    icon: <PhoneIcon className="size-5 text-white" />,
    iconBg: 'bg-[#4ade80]',
    title: 'Mobile Money',
    description: 'Send a donation instantly via MTN MoMo, Telecel Cash, or AirtelTigo Money — the easiest way to give locally.',
    cta: 'Donate Now',
    href: '/donate',
  },
  {
    icon: <BankIcon className="size-5 text-white" />,
    iconBg: 'bg-[#facc15]',
    title: 'Bank Transfer',
    description: 'Make a direct transfer to our GCB, Absa, or Ecobank account for larger individual or business donations.',
    cta: 'Get Details',
    href: '/donate',
  },
  {
    icon: <CardIcon className="size-5 text-white" />,
    iconBg: 'bg-primary',
    title: 'Paystack',
    description: 'Pay securely with your card or mobile money through Paystack — perfect for local and diaspora donors.',
    cta: 'Donate Now',
    href: '/donate',
  },
  {
    icon: <GiftIcon className="size-5 text-white" />,
    iconBg: 'bg-[#fb923c]',
    title: 'In-Kind Donations',
    description: 'Donate food, clothing, school materials, or baby items directly to mothers and children who need them most.',
    cta: 'Learn More',
    href: '/donate',
  },
  {
    icon: <UsersIcon className="size-5 text-white" />,
    iconBg: 'bg-[#4ade80]',
    title: 'Volunteer Your Time',
    description: 'Offer your skills as a teacher, trainer, or community worker. Your time and presence can change a mother\'s life.',
    cta: 'Get Involved',
    href: '/donate',
  },
  {
    icon: <BellIcon className="size-5 text-white" />,
    iconBg: 'bg-[#facc15]',
    title: 'Diaspora Giving',
    description: 'Ghanaians abroad can easily send support via Paystack or mobile money top-up from anywhere in the world.',
    cta: 'Support',
    href: '/donate',
  },
]

const WaysToHelpSection = () => {
  return (
    <section id="ways-to-help" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16">
          <Badge variant="outline" className="gap-2 text-sm font-normal px-4 py-1.5">
            <BellIcon className="size-4 text-primary" />
            How you can help
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Ways you can make a difference
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            There are many ways to support mothers and children in Ghana. Find the one that works best for you and help us make a lasting difference.
          </p>
        </div>

        {/* Grid */}
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-border sm:divide-x">
            {ways.map((way, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center gap-4 p-8
                  ${index >= 3 ? 'border-t border-border' : ''}
                  ${index % 3 !== 0 ? '' : ''}
                `}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${way.iconBg}`}>
                  {way.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-foreground">{way.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{way.description}</p>
                </div>

                {/* CTA */}
                <Button
      variant="outline"
      className="w-full rounded-xl border-border hover:border-primary hover:text-primary transition-colors font-semibold mt-auto"
      onClick={() => window.location.href = way.href}
    >
      {way.cta}
    </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default WaysToHelpSection
