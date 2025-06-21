import z from 'zod'

const permissionSchema = z.object({
  name: z.string().min(1, {
    required_error: 'Name is required.'
  }),
  ruc: z.string().min(1, {
    required_error: 'RUC is required.'
  }),
  phone: z.string().nullable().optional(),
})

export function validateCompany (input) {
  return permissionSchema.safeParse(input)
}

export function validatePartialCompany (input) {
  return permissionSchema.partial().safeParse(input)
}
