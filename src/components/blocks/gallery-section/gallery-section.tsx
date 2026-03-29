const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    alt: 'Children receiving support',
    title: 'Children Welfare',
    description: 'Giving every child a chance to thrive.',
  },
  {
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    alt: 'Volunteers working together',
    title: 'Community Outreach',
    description: 'Reaching the most vulnerable in our communities.',
  },
  {
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&q=80',
    alt: 'Maternal care support',
    title: 'Maternal Health',
    description: 'Safe delivery and care for every mother.',
  },
  {
    image: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=600&q=80',
    alt: 'Education programs',
    title: 'Education Programs',
    description: 'Building brighter futures through learning.',
  },
  {
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    alt: 'Volunteer programs',
    title: 'Volunteer Programs',
    description: 'Join hands and make a real difference.',
  },
  {
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
    alt: 'Medical aid distribution',
    title: 'Medical Aid',
    description: 'Healthcare is a right, not a privilege.',
  },
  {
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80',
    alt: 'Women empowerment',
    title: 'Women Empowerment',
    description: 'Uplifting women to lead and inspire.',
  },
]

const GallerySection = () => {
  return (
    <section id="gallery" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Bento grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto',
          }}
        >
          {/* Item 1 — small, top-left */}
          <GalleryItem
            item={galleryItems[0]}
            style={{ gridColumn: 'span 3', gridRow: 'span 1' }}
            className="h-44"
          />

          {/* Item 2 — wide, top-left-center */}
          <GalleryItem
            item={galleryItems[1]}
            style={{ gridColumn: 'span 5', gridRow: 'span 1' }}
            className="h-44"
          />

          {/* Item 3 — tall, top-right spanning 2 rows */}
          <GalleryItem
            item={galleryItems[2]}
            style={{ gridColumn: 'span 4', gridRow: 'span 2' }}
            className="h-full min-h-[368px]"
          />

          {/* Item 4 — tall, bottom-left spanning 2 rows */}
          <GalleryItem
            item={galleryItems[3]}
            style={{ gridColumn: 'span 3', gridRow: 'span 2' }}
            className="h-full min-h-[368px]"
          />

          {/* Item 5 — wide, bottom-left-center */}
          <GalleryItem
            item={galleryItems[4]}
            style={{ gridColumn: 'span 5', gridRow: 'span 2' }}
            className="h-56 sm:h-full min-h-[368px]"
          />

          {/* Item 6 — wide bottom-right */}
          <GalleryItem
            item={galleryItems[5]}
            style={{ gridColumn: 'span 3', gridRow: 'span 1' }}
            className="h-44"
          />

          {/* Item 7 — small bottom-right corner */}
          <GalleryItem
            item={galleryItems[6]}
            style={{ gridColumn: 'span 1', gridRow: 'span 1' }}
            className="h-44"
          />
        </div>

      </div>
    </section>
  )
}

type GalleryItemProps = {
  item: {
    image: string
    alt: string
    title: string
    description: string
  }
  style?: React.CSSProperties
  className?: string
}

const GalleryItem = ({ item, style, className }: GalleryItemProps) => {
  return (
    <div
      style={style}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Gradient overlay — always present, text revealed on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Text — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <p className="text-white font-semibold text-sm sm:text-base leading-tight">{item.title}</p>
        <p className="text-white/80 text-xs sm:text-sm mt-1 leading-snug">{item.description}</p>
      </div>
    </div>
  )
}

export default GallerySection