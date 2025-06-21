import z from 'zod'

const productSchema = z.object({
  name: z.string().min(1, {
    required_error: 'Name is required.'
  }),
  description: z.string().nullable().optional(),
  price: z.string().nullable().optional(),
  is_active: z.boolean().default(true)
})

export function validateProduct (input) {
  return productSchema.safeParse(input)
}

export function validatePartialProduct (input) {
  return productSchema.partial().safeParse(input)
}
