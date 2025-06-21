import z from 'zod'

const userSchema = z.object({
  name: z.string().min(1, {
    required_error: 'Name is required.'
  }),
  last_name: z.string().min(1, {
    required_error: 'Last name is required.'
  }),
  email: z.string().min(1, {
    required_error: 'Email is required.'
  }),
  password: z.string().default("pass1234"),
  phone: z.string().nullable().optional(),
  role_id: z.string().min(1, {
    required_error: 'Role is required.'
  })
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input)
}
