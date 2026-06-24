import type { APIRoute } from 'astro'
import { z } from 'zod'
import { json, error, serverError } from '../../../lib/api/response'
import { createInkind } from '../../../lib/db/queries'

const InkindSchema = z.object({
  donor_name: z.string().min(2, 'Name is required'),
  donor_email: z.string().email('Valid email is required'),
  country: z.string().optional(),
  item_description: z.string().min(5, 'Please describe the items'),
  estimated_value: z.number().positive().optional(),
  photos: z.array(z.string().url()).optional(),
  message: z.string().optional(),
  expected_ship_date: z.string().optional(),
})

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const parsed = InkindSchema.safeParse(body)

    if (!parsed.success) {
      return error(parsed.error.issues[0].message)
    }

    const data = parsed.data
    const id = crypto.randomUUID()

    await createInkind({
      id,
      ...data,
    })

    return json({ success: true, id }, 201)
  } catch {
    return serverError()
  }
}
