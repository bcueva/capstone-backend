import z from 'zod'

const permissionSchema = z.object({
  name: z.string().min(1, {
    required_error: 'Name is required.'
  }),
  description: z.string().optional(),
})

export function validatePermission (input) {
  return permissionSchema.safeParse(input)
}

export function validatePartialPermission (input) {
  return permissionSchema.partial().safeParse(input)
}
