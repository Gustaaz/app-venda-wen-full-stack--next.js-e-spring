import { z } from 'zod'

export const customerSchema = z.object({
  id: z.number().optional(),
  dataCadastro: z.string().optional(),
  nome: z
    .string()
    .min(1, { message: 'O nome é obrigatório' })
    .max(100, { message: 'O nome deve ter no maximo 100 caracteres' }),
  email: z
    .string()
    .email({ message: 'O email é obrigatório' })
    .max(100, { message: 'O email deve ter no maximo 100 caracteres' }),
  cpf: z
    .string()
    .min(11, { message: 'O CPF deve ter no minimo 11 caracteres' })
    .max(11, { message: 'O CPF deve ter no maximo 11 caracteres' }),
  telefone: z
    .string()
    .min(8, { message: 'O telefone deve ter no minimo 8 caracteres' })
    .max(8, { message: 'O telefone deve ter no maximo 8 caracteres' }),
  dataNascimento: z.string(),
  endereco: z
    .string()
    .max(100, { message: 'O endereço deve ter no maximo 100 caracteres' }),
})
