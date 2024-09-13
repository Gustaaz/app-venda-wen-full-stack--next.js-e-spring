import { itemSalesProductSchema } from '@/schema/item-sales-product-schema'
import { z } from 'zod'

export type ItemSaleProductSchema = z.infer<typeof itemSalesProductSchema>
