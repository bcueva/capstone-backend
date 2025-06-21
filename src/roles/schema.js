import z from 'zod'

const roleSchema = z.object({
  name: z.string().min(1, {
    required_error: 'Name is required.'
  }),
  description: z.string().nullable().optional(),
  permissions: z.record(z.any()).default({})
})

export function validateRole (input) {
  return roleSchema.safeParse(input)
}

export function validatePartialRole (input) {
  return roleSchema.partial().safeParse(input)
}
