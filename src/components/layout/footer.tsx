import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerLinks = {
  quickLinks: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Our Programmes', href: '/#donation-programmes' },
    { label: 'Impact', href: '/#impact-metrics' },
    { label: 'Gallery', href: '/#gallery' },
  ],
  getInvolved: [
    { label: 'Donate Now', href: '/#donation-programmes' },
    { label: 'Become a Volunteer', href: '/#volunteer-impact' },
    { label: 'Corporate Partnerships', href: '/#ways-to-help' },
    { label: 'Fundraise for Us', href: '/#ways-to-help' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact Us', href: '/#contact-us' },
  ],
};

const socials = [
  { icon: <FacebookIcon className="size-4" />, href: '#', label: 'Facebook' },
  { icon: <XIcon className="size-4" />, href: '#', label: 'Twitter' },
  { icon: <InstagramIcon className="size-4" />, href: '#', label: 'Instagram' },
  { icon: <LinkedinIcon className="size-4" />, href: '#', label: 'LinkedIn' },
];

const Footer = () => {
  return (
    <footer className="bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <a
              href="/"
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              aria-label="MabeCare Foundation home"
            >
              <img src="/images/site-logo.png" alt="Logo" className="h-8 w-auto" width={32} height={32} />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold uppercase">MabeCare</span>
                <span className="text-xs uppercase text-primary">Foundation</span>
              </div>
            </a>

            <p className="text-muted-foreground max-w-sm">
              Empowering mothers, protecting children, and building stronger communities.
            </p>

            {/* Newsletter */}
            <form className="flex items-center rounded-full bg-muted/50 p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-2 outline-none"
              />
              <Button type="submit" className="rounded-full px-4">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Links */}
          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          
            <nav className="flex flex-col gap-4" aria-label="Quick links">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              {footerLinks.quickLinks.map(link => (
                <a key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  {link.label}
                </a>
              ))}
            </nav>
          
            <nav className="flex flex-col gap-4" aria-label="Get involved">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                Get Involved
              </h4>
              {footerLinks.getInvolved.map(link => (
                <a key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  {link.label}
                </a>
              ))}
            </nav>
          
            <nav className="col-span-2 sm:col-span-1 flex flex-col gap-4" aria-label="Legal">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                Legal & Policy
              </h4>
              {footerLinks.legal.map(link => (
                <a key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  {link.label}
                </a>
              ))}
            </nav>
          
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} All Rights Reserved by{" "}
            <a
              href="https://sloanedev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Sloane.Dev
            </a>
          </p>

          <div className="flex items-center gap-6">
            {socials.map(social => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-muted-foreground hover:text-primary p-2"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer;