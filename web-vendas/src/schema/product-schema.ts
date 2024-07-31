import { z } from 'zod'

export const productSchema = z.object({
  id: z.number().optional(),
  dataCadastro: z.string().optional(),
  sku: z.string().trim().min(1, { message: 'O SKU é obrigatório' }),
  preco: z
    .string()
    .or(z.number())
    .transform(
      (value) =>
        value && Number(value.toString().replace('.', '').replace(',', '.')),
    )
    .refine((value) => !value || value > 0, {
      message: 'O preco deve ser maior que zero',
    }),
  nome: z
    .string()
    .min(1, { message: 'O nome é obrigatório' })
    .max(100, { message: 'O nome deve ter no maximo 100 caracteres' }),
  descricao: z
    .string()
    .min(10, { message: 'A descricão deve ter pelo menos 10 caracteres' }),
})
