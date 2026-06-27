const CACHE_NAME = 'mabecare-admin-v1'

const STATIC_ASSETS = [
  '/admin/dashboard',
  '/admin/donations',
  '/admin/inkind',
  '/admin/reports',
  '/admin-manifest.json',
]

// ── Install — cache static shell ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// ── Activate — clean old caches ───────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

// ── Fetch ─────────────────────────────────────────────────────
// Strategy:
// - Non-GET: skip entirely
// - API routes: network only, never cache
// - External origins (fonts, Cloudinary, Paystack): skip, let browser handle
// - Admin pages/assets: network first, cache fallback
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)

  if (event.request.method !== 'GET') return
  if (url.pathname.startsWith('/api/')) return
  if (url.origin !== self.location.origin) return

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
        }
        return response
      })
      .catch(() => caches.match(event.request).then(cached => {
        if (cached) return cached
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/admin/dashboard')
        }
        return new Response('Offline', { status: 503 })
      }))
  )
})

// ── Background Sync — replay queued offline actions ───────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-status-updates') {
    event.waitUntil(syncOfflineUpdates())
  }
})

function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function syncOfflineUpdates() {
  const db = await openQueue()
  const tx = db.transaction('queue', 'readwrite')
  const store = tx.objectStore('queue')
  const all = await store.getAll()

  await Promise.allSettled(
    all.map(async item => {
      try {
        const res = await fetch(item.url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.body),
        })
        if (res.ok) {
          const deleteTx = db.transaction('queue', 'readwrite')
          deleteTx.objectStore('queue').delete(item.id)
        }
      } catch {
        // Leave in queue for next sync attempt
      }
    })
  )
}

// ── IndexedDB offline queue ───────────────────────────────────
function openQueue() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('mabecare-offline', 1)
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore('queue', {
        keyPath: 'id',
        autoIncrement: true,
      })
    }
    req.onsuccess = e => resolve(e.target.result)
    req.onerror = () => reject(req.error)
  })
}
