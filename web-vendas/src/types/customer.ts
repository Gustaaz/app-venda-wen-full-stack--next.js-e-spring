import { customerSchema } from '@/schema/customer-schema'
import { z } from 'zod'

export type Customer = z.infer<typeof customerSchema>
