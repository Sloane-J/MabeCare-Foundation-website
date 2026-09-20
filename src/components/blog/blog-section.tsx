import { useEffect, useMemo, useState } from 'react'
import BlogCard, { type BlogPostSummary } from './blog-card'

interface BlogSectionProps {
  posts: BlogPostSummary[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const categoryFromUrl = params.get('category')
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl)
    }
  }, [])

  const categories = useMemo(() => {
    const unique = new Set(posts.map((post) => post.category))
    return Array.from(unique)
  }, [posts])

  const topTags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag)
  }, [posts])

  const filteredPosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = activeCategory ? post.category === activeCategory : true
      const matchesSearch = term
        ? post.title.toLowerCase().includes(term) ||
          post.category.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term))
        : true
      return matchesCategory && matchesSearch
    })
  }, [posts, activeCategory, searchTerm])

  const categoryList = (
    <ul className="flex flex-col gap-1">
      <li>
        <button
          onClick={() => setActiveCategory(null)}
          className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
            activeCategory === null ? 'bg-primary text-primary-foreground' : 'text-foreground'
          }`}
        >
          All posts
        </button>
      </li>
      {categories.map((category) => (
        <li key={category}>
          <button
            onClick={() => setActiveCategory(category)}
            className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
              activeCategory === category ? 'bg-primary text-primary-foreground' : 'text-foreground'
            }`}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 lg:flex-row lg:items-start">
      {/* 1. Header & Categories */}
      <aside className="order-1 flex w-full flex-col gap-6 lg:w-1/5">
        <div>
          <p className="mt-2 text-sm text-muted-foreground">
            Stories, updates, and events from MabEcare Foundation.
          </p>
        </div>

        {/* Mobile: accordion */}
        <details className="rounded-md border border-border lg:hidden">
          <summary className="cursor-pointer px-3 py-2 text-sm font-medium">
            Categories
          </summary>
          <div className="px-2 pb-2">{categoryList}</div>
        </details>

        {/* Desktop: plain list */}
        <div className="hidden lg:block">{categoryList}</div>
      </aside>

      {/* 2. Top Search & Tags bar on mobile / Right sidebar on desktop */}
      <aside className="order-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:order-3 lg:w-1/5 lg:grid-cols-1 lg:gap-6">
        <div>
          <label htmlFor="search-input" className="mb-2 block text-sm font-semibold text-foreground lg:hidden">
            Search
          </label>
          <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Top tags</h4>
          <ul className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1">
            {topTags.map((tag) => {
              const isActive = searchTerm.toLowerCase() === tag.toLowerCase()
              return (
                <li key={tag}>
                  <button
                    onClick={() => setSearchTerm(isActive ? '' : tag)}
                    className={`rounded-md px-2 py-1 text-xs transition-colors lg:p-0 lg:bg-transparent lg:text-sm ${
                      isActive
                        ? 'bg-primary text-primary-foreground lg:text-primary'
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:bg-transparent lg:hover:text-primary'
                    }`}
                  >
                    #{tag}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>

      {/* 3. Blog Posts Grid: 2 columns on mobile/tablet, 3 columns on desktop */}
      <main className="order-3 w-full lg:order-2 lg:w-3/5">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No posts match your search.
          </p>
        )}
      </main>
    </div>
  )
}