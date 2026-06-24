export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function error(message: string, status = 400): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function unauthorized(): Response {
  return error('Unauthorized', 401)
}

export function notFound(): Response {
  return error('Not found', 404)
}

export function serverError(): Response {
  return error('Internal server error', 500)
}
