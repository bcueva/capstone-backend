import z from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, {
    required_error: 'Name is required.'
  }),
  description: z.string().optional(),
})

export function validateContact (input) {
  return contactSchema.safeParse(input)
}

export function validatePartialContact (input) {
  return contactSchema.partial().safeParse(input)
}
