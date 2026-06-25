const CACHE_NAME = 'mabecare-admin-v1'

const STATIC_ASSETS = [
  '/admin/dashboard',
  '/admin/donations',
  '/admin/inkind',
  '/admin/reports',
  '/admin-manifest.json',
]

// Install — cache static shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Fetch strategy:
// - API routes: network only (never cache)
// - Everything else: network first, fall back to cache
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)

  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  // API routes — network only
  if (url.pathname.startsWith('/api/')) return

  // Admin pages — network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
        }
        return response
      })
      .catch(() => caches.match(event.request))
  )
})

// Background sync for queued offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-status-updates') {
    event.waitUntil(syncOfflineUpdates())
  }
})

async function syncOfflineUpdates() {
  // Opens IndexedDB queue and replays any pending PATCH requests
  const db = await openQueue()
  const tx = db.transaction('queue', 'readwrite')
  const store = tx.objectStore('queue')
  const all = await store.getAll()

  for (const item of all) {
    try {
      await fetch(item.url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.body),
      })
      await store.delete(item.id)
    } catch {
      // Leave in queue for next sync
    }
  }
}

function openQueue() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('mabecare-offline', 1)
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore('queue', { keyPath: 'id', autoIncrement: true })
    }
    req.onsuccess = e => resolve(e.target.result)
    req.onerror = reject
  })
}
