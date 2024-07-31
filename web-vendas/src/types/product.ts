import { productSchema } from '@/schema/product-schema'
import { z } from 'zod'

export type Product = z.infer<typeof productSchema>
