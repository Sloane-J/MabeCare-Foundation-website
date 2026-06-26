// Site Configuration
// Centralized configuration for site metadata, SEO, and branding

export const SITE_TITLE = 'MabEcare Foundation'
export const SITE_DESCRIPTION =
  'MabEcare Foundation is dedicated to improving healthcare access and supporting communities through charitable programs, donations, and volunteer initiatives.'

export const GITHUB_URL = 'https://github.com/Sloane-J/MabEcare-Foundation-website'
export const SITE_URL = 'https://mabecare-foundation.vercel.app/'

export const SITE_METADATA = {
  title: {
    default: 'MabEcare Foundation | Empowering Mothers & Children in Ghana'
  },
  description:
    'MabEcare Foundation supports pregnant women, empowers mothers, and protects children in Ghana through healthcare, education, blood donation drives, and community outreach. Donate or volunteer today.',
  keywords: [
    'MabEcare Foundation',
    'charity Ghana',
    'non-profit Ghana',
    'maternal health Ghana',
    'children welfare Ghana',
    'women empowerment Ghana',
    'community outreach Ho Volta Region',
    'blood donation Ghana',
    'early childhood education Ghana',
    'special needs children Ghana',
    'donate Ghana',
    'volunteer Ghana',
    'maternal mental health',
    'mothers support Ghana',
    'foundation Ho Ghana',
    'samuel dorkey',
    'sloane jnr'
  ],
  authors: [{ name: 'MabEcare Foundation', url: SITE_URL }],
  creator: 'MabEcare Foundation',
  publisher: 'MabEcare Foundation',
  robots: {
    index: true,
    follow: true
  },
  language: 'en-UK',
  locale: 'en_UK',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MabEcare Foundation',
    title: 'MabEcare Foundation | Empowering Mothers & Children in Ghana',
    description:
      'MabEcare Foundation supports pregnant women, empowers mothers, and protects children in Ghana through healthcare, education, blood donation drives, and community outreach. Donate or volunteer today.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MabEcare Foundation — Empowering Mothers & Children in Ghana',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mabecarefoundation',
    creator: '@mabecarefoundation',
    title: 'MabEcare Foundation | Empowering Mothers & Children in Ghana',
    description:
      'MabEcare Foundation supports pregnant women, empowers mothers, and protects children in Ghana through healthcare, education, blood donation drives, and community outreach. Donate or volunteer today.',
    images: ['/images/og-image.png']
  },
  verification: {
    google: '', // Add your Google verification code
    yandex: '', // Add your Yandex verification code
    bing: '' // Add your Bing verification code
  }
}

// Social media links
export const SOCIAL_LINKS = {
  github: GITHUB_URL,
  twitter: '#',
  linkedin: 'https://www.linkedin.com/in/joana-yirenkyi-019a55385',
  discord: '#'
}

// Company information for structured data
export const COMPANY_INFO = {
  name: 'MabEcare Foundation',
  legalName: 'MabEcare Foundation',
  url: SITE_URL,
  logo: `/images/site-logo.png`,
  foundingDate: '2026',
  address: {
    streetAddress: 'Ho',
    addressLocality: 'Ho',
    addressRegion: 'Volta Region',
    postalCode: '',
    addressCountry: 'GH'
  },
  contactPoint: {
    telephone: '+233545784681',
    contactType: 'General Enquiries',
    email: 'mabecarefoundation@gmail.com'
  },
  sameAs: Object.values(SOCIAL_LINKS)
}
