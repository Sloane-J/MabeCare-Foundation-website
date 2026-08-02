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
    year: 'numeric'
  }).format(new Date(post.pubDate))

  const topTags = post.tags.slice(0, 2)

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            className="h-full w-full object-cover"
          />
        )}
        {topTags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1">
            {topTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-sans text-lg font-semibold text-foreground">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.description}
        </p>
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
        <a
          href={`/blog/${post.slug}/`}
          className="mt-1 inline-block w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Read more
        </a>
      </div>
    </div>
  )
}