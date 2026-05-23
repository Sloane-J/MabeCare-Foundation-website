'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.98-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const contactDetails = [
  {
    icon: <MapPinIcon className="size-5 text-primary" />,
    label: 'Address',
    value: 'Ho, Volta Region, Ghana',
    href: null,
  },
  {
    icon: <PhoneIcon className="size-5 text-primary" />,
    label: 'Phone',
    value: '+233 50 000 0000',
    href: 'tel:+233500000000',
  },
  {
    icon: <MailIcon className="size-5 text-primary" />,
    label: 'Email',
    value: 'mabecarefoundation@gmail.com',
    href: 'mailto:mabecarefoundation@gmail.com',
  },
  {
    icon: <WhatsAppIcon className="size-5 text-primary" />,
    label: 'WhatsApp',
    value: '+233 54 578 4681',
    href: 'https://wa.me/233545784681',
  },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const ContactUsSection = () => {
  const [formState, setFormState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })

      const json = await res.json()

      if (json.success) {
        setFormState('success')
        form.reset()
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <div id="contact-us" className="flex flex-col">
      <section aria-labelledby="contact-heading" className="py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16">
            <Badge variant="outline" className="gap-2 text-sm font-normal px-4 py-1.5">
              <MailIcon className="size-4 text-primary" />
              Contact Us
            </Badge>
            <h1
              id="contact-heading"
              className="text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl"
            >
              We would love to{' '}
              <span className="text-primary">hear</span>{' '}
              from you
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
              Whether you want to donate, volunteer, partner with us, or simply learn more about our work, we are here and happy to talk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — contact info */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-foreground">Get in touch</h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Reach out to us through any of the channels below. We typically respond within one to two business days.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {contactDetails.map((detail, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      {detail.icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {detail.label}
                      </p>

                      {detail.href ? (
                        <a
                          href={detail.href}
                          target={detail.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            detail.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-muted/50 px-6 py-5 flex flex-col gap-2">
                <p className="text-sm font-semibold text-foreground">Office Hours</p>
                <p className="text-sm text-muted-foreground">Monday to Friday, 8:00 AM to 5:00 PM GMT</p>
                <p className="text-sm text-muted-foreground">Saturday, 9:00 AM to 1:00 PM GMT</p>
              </div>
            </div>

            {/* Right — form */}
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-foreground">Send us a message</h2>
                <p className="text-sm text-muted-foreground">Fill in the form below and we will get back to you.</p>
              </div>

              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="size-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-foreground">Message sent!</p>
                    <p className="text-sm text-muted-foreground">Thank you for reaching out. We will get back to you within one to two business days.</p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full mt-2"
                    onClick={() => setFormState('idle')}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                  {/* Web3Forms access key — replace with your own from web3forms.com */}
                  <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />
                  <input type="hidden" name="subject" value="New message from MabeCare Foundation website" />
                  <input type="hidden" name="from_name" value="MabeCare Foundation Website" />
                  {/* Honeypot spam protection */}
                  <input type="checkbox" name="botcheck" className="hidden" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="full-name" className="text-sm font-medium text-foreground">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="full-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Joana Ewurama Safoa Yirenkyi"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="joana.yirenkyi@example.com"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject-select" className="text-sm font-medium text-foreground">
                      Subject <span className="text-primary">*</span>
                    </label>
                    <select
                      id="subject-select"
                      name="subject_type"
                      required
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Volunteering">Volunteering</option>
                      <option value="Donation">Donation</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help or how you would like to get involved..."
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {formState === 'error' && (
                    <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
                      Something went wrong. Please try again or contact us directly by email.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-semibold py-5 text-sm"
                  >
                    {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We respect your privacy. Your information will never be shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUsSection
