'use client'

import { useState } from 'react'
import {
  MapPin, Phone, Mail, Clock, Loader2, CheckCircle2, ChevronDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z' />
  </svg>
)

const contactDetails = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Accra, Greater Accra Region, Ghana',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+233 54 578 4681 / +233 20 720 5960',
    href: 'tel:0545784681',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'mabecarefoundation@gmail.com',
    href: 'mailto:mabecarefoundation@gmail.com',
  },
  {
    icon: WhatsAppIcon,
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
    <div id='contact-us' className='relative flex flex-col bg-background overflow-hidden'>
      <section aria-labelledby='contact-heading' className='relative py-20 sm:py-28 lg:py-36'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='mx-auto mb-16 flex max-w-2xl flex-col items-center justify-center space-y-6 text-center sm:mb-20'>
            <Badge
              variant='outline'
              className='gap-2 rounded-full px-5 py-2 text-sm font-medium border-primary/20 bg-primary/5 text-primary'
            >
              <Mail className='size-4' />
              Contact Us
            </Badge>
            <h1
              id='contact-heading'
              className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'
            >
              We would love to <span className='text-primary'>hear</span> from you
            </h1>
            <p className='text-muted-foreground max-w-lg text-lg leading-relaxed'>
              Whether you want to donate, volunteer, partner with us, or simply learn more about our work, we are here
              and happy to talk.
            </p>
          </div>

          <div className='grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-12'>
            {/* Left — contact info */}
            <div className='flex flex-col gap-10 lg:col-span-5'>
              <div className='flex flex-col gap-4'>
                <h2 className='text-foreground text-2xl font-bold tracking-tight sm:text-3xl'>Get in touch</h2>
                <p className='text-muted-foreground text-base leading-relaxed'>
                  Reach out through any of the channels below. We typically respond within one to two business days.
                </p>
              </div>

              <div className='flex flex-col gap-4'>
                {contactDetails.map((detail, i) => {
                  const Icon = detail.icon
                  return (
                    <div
                      key={i}
                      className='group flex items-start gap-5 rounded-2xl border border-border/80 bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-md'
                    >
                      <div className='flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
                        <Icon className='size-5' />
                      </div>
                      <div className='flex flex-col gap-1 pt-0.5'>
                        <p className='text-muted-foreground text-xs font-semibold tracking-wider uppercase'>
                          {detail.label}
                        </p>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            target={detail.href.startsWith('http') ? '_blank' : undefined}
                            rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className='text-foreground text-sm font-semibold transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className='text-foreground text-sm font-semibold'>{detail.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Office Hours */}
              <div className='rounded-2xl bg-muted/50 border border-border p-6'>
                <div className='flex items-center gap-3 mb-5'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                    <Clock className='size-5 text-primary' />
                  </div>
                  <h3 className='text-foreground text-base font-bold'>Office Hours</h3>
                </div>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Monday &ndash; Friday</span>
                    <span className='font-semibold text-foreground'>8:00 AM &ndash; 5:00 PM GMT</span>
                  </div>
                  <div className='h-px bg-border' />
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Saturday</span>
                    <span className='font-semibold text-foreground'>9:00 AM &ndash; 1:00 PM GMT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className='lg:col-span-7'>
              <div className='flex flex-col gap-8 rounded-3xl border border-border bg-card p-8 shadow-lg sm:p-10 lg:p-12'>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-foreground text-2xl font-bold tracking-tight sm:text-3xl'>Send us a message</h2>
                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    Fill in the form below and we will get back to you as soon as possible.
                  </p>
                </div>

                {formState === 'success' ? (
                  <div className='flex flex-col items-center justify-center gap-6 py-16 text-center animate-in fade-in zoom-in duration-500'>
                    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
                      <CheckCircle2 className='size-10 text-green-600 dark:text-green-400' strokeWidth={2.5} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-foreground text-2xl font-bold'>Message sent!</p>
                      <p className='text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed'>
                        Thank you for reaching out. We will get back to you within one to two business days.
                      </p>
                    </div>
                    <Button
                      variant='outline'
                      className='mt-2 w-full sm:w-auto font-semibold rounded-xl px-8'
                      onClick={() => setFormState('idle')}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    {/* Web3Forms access key */}
                    <input type='hidden' name='access_key' value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />
                    <input type='hidden' name='subject' value='New message from MabEcare Foundation website' />
                    <input type='hidden' name='from_name' value='MabEcare Foundation Website' />
                    {/* Honeypot */}
                    <input type='checkbox' name='botcheck' className='hidden' />

                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                      <div className='flex flex-col gap-2.5'>
                        <label htmlFor='full-name' className='text-foreground text-sm font-semibold'>
                          Full Name <span className='text-primary'>*</span>
                        </label>
                        <input
                          id='full-name'
                          name='name'
                          type='text'
                          required
                          autoComplete='name'
                          placeholder='Joana Ewurama Safoa'
                          className='w-full rounded-xl border border-input bg-background px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15'
                        />
                      </div>

                      <div className='flex flex-col gap-2.5'>
                        <label htmlFor='email' className='text-foreground text-sm font-semibold'>
                          Email Address <span className='text-primary'>*</span>
                        </label>
                        <input
                          id='email'
                          name='email'
                          type='email'
                          required
                          autoComplete='email'
                          placeholder='joana@example.com'
                          className='w-full rounded-xl border border-input bg-background px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15'
                        />
                      </div>
                    </div>

                    <div className='flex flex-col gap-2.5'>
                      <label htmlFor='subject-select' className='text-foreground text-sm font-semibold'>
                        Subject <span className='text-primary'>*</span>
                      </label>
                      <div className='relative'>
                        <select
                          id='subject-select'
                          name='subject_type'
                          required
                          defaultValue=''
                          className='w-full appearance-none rounded-xl border border-input bg-background px-4 py-3.5 text-sm text-foreground transition-all cursor-pointer focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15'
                        >
                          <option value='' disabled>
                            Select a subject
                          </option>
                          <option value='General Enquiry'>General Enquiry</option>
                          <option value='Volunteering'>Volunteering</option>
                          <option value='Donation'>Donation</option>
                          <option value='Partnership'>Partnership</option>
                          <option value='Other'>Other</option>
                        </select>
                        <div className='pointer-events-none absolute inset-y-0 right-4 flex items-center'>
                          <ChevronDown className='size-4 text-muted-foreground' />
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col gap-2.5'>
                      <label htmlFor='message' className='text-foreground text-sm font-semibold'>
                        Message <span className='text-primary'>*</span>
                      </label>
                      <textarea
                        id='message'
                        name='message'
                        required
                        rows={5}
                        placeholder='Tell us how we can help or how you would like to get involved...'
                        className='w-full resize-none rounded-xl border border-input bg-background px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15'
                      />
                    </div>

                    {formState === 'error' && (
                      <div className='rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3.5'>
                        <p className='text-sm text-destructive font-medium'>
                          Something went wrong. Please try again or contact us directly by email.
                        </p>
                      </div>
                    )}

                    <Button
                      type='submit'
                      disabled={formState === 'submitting'}
                      className='w-full rounded-xl py-6 text-base font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg'
                    >
                      {formState === 'submitting' ? (
                        <span className='flex items-center justify-center gap-2'>
                          <Loader2 className='size-5 animate-spin' />
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </Button>

                    <p className='text-center text-xs font-medium text-muted-foreground/80'>
                      We respect your privacy. Your information will never be shared with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUsSection