// @ts-check
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://mabecare-foundation.vercel.app',
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: page =>
        !page.includes('/admin/') &&
        !page.includes('/private/') &&
        !page.includes('/404'),
      serialize(item) {
        const url = item.url

        // Homepage
        if (url === 'https://mabecare-foundation.vercel.app/') {
          // @ts-expect-error - Valid sitemap changefreq value
          item.changefreq = 'daily'
          item.priority = 1.0

        // About Us — important, changes occasionally
        } else if (url.includes('/about-us')) {
          // @ts-expect-error - Valid sitemap changefreq value
          item.changefreq = 'monthly'
          item.priority = 0.9

        // Contact Us
        } else if (url.includes('/contact-us')) {
          // @ts-expect-error - Valid sitemap changefreq value
          item.changefreq = 'monthly'
          item.priority = 0.8

        // Donate page — high priority, drives conversions
        } else if (url.includes('/donate')) {
          // @ts-expect-error - Valid sitemap changefreq value
          item.changefreq = 'monthly'
          item.priority = 0.9

        // Blog listing
        } else if (url.includes('/blog') && !url.includes('/blog/')) {
          // @ts-expect-error - Valid sitemap changefreq value
          item.changefreq = 'daily'
          item.priority = 0.8

        // Individual blog posts
        } else if (url.includes('/blog/')) {
          // @ts-expect-error - Valid sitemap changefreq value
          item.changefreq = 'weekly'
          item.priority = 0.7

        // Tags and categories
        } else if (url.includes('/tags/') || url.includes('/categories/')) {
          // @ts-expect-error - Valid sitemap changefreq value
          item.changefreq = 'weekly'
          item.priority = 0.6

        // Everything else
        } else {
          // @ts-expect-error - Valid sitemap changefreq value
          item.changefreq = 'monthly'
          item.priority = 0.5
        }

        return item
      }
    })
  ],
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@radix-ui/*']
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
})