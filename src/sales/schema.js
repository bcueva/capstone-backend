import z from 'zod'

const saleSchema = z.object({
  companyRuc: z.string().default('20123456789'),
  userId: z.number().min(1, {
    required_error: 'User is required.'
  }),
  tableId: z.string().min(1, {
    required_error: 'Table id is required.'
  }),
  details: z.array(z.any()).default([]),
  endSale: z.boolean().default(false)
})

export function validateSale (input) {
  return saleSchema.safeParse(input)
}

export function validatePartialSale (input) {
  return saleSchema.partial().safeParse(input)
}
