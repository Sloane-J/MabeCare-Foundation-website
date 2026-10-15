export type Video = {
  id: string
  title: string
  published: string
  thumbnail: string
  url: string
}

const channelId = import.meta.env.YOUTUBE_CHANNEL_ID as string | undefined

// export const channelUrl = channelId
//   ? `https://www.youtube.com/channel/${channelId}`
//   : 'https://www.youtube.com'
export const channelUrl = 'https://www.youtube.com/@mabecarefoundation'

function decode(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

export async function getVideos(limit?: number): Promise<Video[]> {
  if (!channelId) return []

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) return []

    const xml = await res.text()

    const videos = xml
      .split('<entry>')
      .slice(1)
      .map(entry => {
        const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? ''
        const title = decode(entry.match(/<title>(.*?)<\/title>/)?.[1] ?? '')
        const published = entry.match(/<published>(.*?)<\/published>/)?.[1] ?? ''

        return {
          id,
          title,
          published,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${id}`,
        }
      })
      .filter(video => video.id)

    return limit ? videos.slice(0, limit) : videos
  } catch {
    return []
  }
}