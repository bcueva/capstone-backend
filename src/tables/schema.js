import z from 'zod'

const tableSchema = z.object({
  number: z.string().min(1, {
    required_error: 'Table number is required.'
  }),
  capacity: z.string().optional(),
  is_active: z.boolean().default(true)
})

export function validateTable (input) {
  return tableSchema.safeParse(input)
}

export function validatePartialTable (input) {
  return tableSchema.partial().safeParse(input)
}
