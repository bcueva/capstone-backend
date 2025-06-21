import z from 'zod'

const loginSchema = z.object({
  email: z.string().min(1, {
    required_error: 'Name is required.'
  }),
  password: z.string().optional(),
})

export function validateLogin (input) {
  return loginSchema.safeParse(input)
}

