import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts'

export async function GET(context) {
  let posts = []
  
  try {
    const allPosts = await getCollection('blog')
    
    posts = allPosts
      .filter(post => !post.data.draft)
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('No blog posts found, generating empty RSS feed')
  }

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.data.slug}/`,
      author: post.data.author,
      categories: post.data.tags || []
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl'
  })
}