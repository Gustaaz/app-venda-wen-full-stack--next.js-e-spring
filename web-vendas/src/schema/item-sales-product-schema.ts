import { z } from 'zod'
import { productSchema } from './product-schema'

export const itemSalesProductSchema = z.object({
  product: productSchema,
  qtd: z.number(),
})
