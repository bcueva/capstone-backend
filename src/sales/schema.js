import z from 'zod'

const saleSchema = z.object({
  companyRuc: z.string().min(1, {
    required_error: 'Company RUC is required.'
  }),
  userId: z.number().min(1, {
    required_error: 'User is required.'
  }),
  details: z.array(z.any()).default([])
})

export function validateSale (input) {
  return saleSchema.safeParse(input)
}

export function validatePartialSale (input) {
  return saleSchema.partial().safeParse(input)
}
