export interface BlogPostSummary {
  slug: string
  title: string
  description: string
  imageUrl?: string
  imageAlt?: string
  pubDate: string
  author: string
  category: string
  tags: string[]
}

interface BlogCardProps {
  post: BlogPostSummary
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.pubDate))

  const topTag = post.tags[0]

  return (
    <div className="group flex h-full flex-col overflow-hidden bg-card text-card-foreground transition-shadow hover:shadow-md">
      {/* Image Header */}
      <a
        href={`/blog/${post.slug}/`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-muted"
      >
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"n
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs">
            No image
          </div>
        )}
        {topTag && (
          <div className="absolute top-2 left-2 z-10">
            <span className="rounded-full bg-accent/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-accent-foreground shadow-xs">
              #{topTag}
            </span>
          </div>
        )}
      </a>

      {/* Content Area - flex-1 expands to fill space, pushing mt-auto button to the bottom */}
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-xs font-medium text-muted-foreground">
          {formattedDate}
        </span>

        <a href={`/blog/${post.slug}/`} className="group-hover:text-primary transition-colors">
          <h3 className="line-clamp-2 font-sans text-base font-semibold text-foreground sm:text-lg">
            {post.title}
          </h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {post.description}
        </p>

        {/* Pinned Read More Link */}
        <div className="mt-auto pt-4">
          <a
            href={`/blog/${post.slug}/`}
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  )
}