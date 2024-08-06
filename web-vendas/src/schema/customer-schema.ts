import { z } from 'zod'
import { cpf } from 'cpf-cnpj-validator'

export const customerSchema = z.object({
  id: z.number().optional(),
  dataCadastro: z.string().optional(),
  nome: z
    .string()
    .toUpperCase()
    .trim()
    .min(1, { message: 'O nome é obrigatório' })
    .max(100, { message: 'O nome deve ter no maximo 100 caracteres' }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'O email é obrigatório' })
    .max(100, { message: 'O email deve ter no maximo 100 caracteres' }),
  cpf: z
    .string()
    .min(14, { message: 'O CPF deve ter no minimo 11 caracteres' })
    .max(14, { message: 'O CPF deve ter no maximo 11 caracteres' })
    .refine(
      (value) => {
        return cpf.isValid(value)
      },
      {
        message: 'O CPF é invalido',
      },
    ),
  telefone: z
    .string()
    .min(13, { message: 'O telefone deve ter no minimo 13 caracteres' })
    .max(14, { message: 'O telefone deve ter no maximo 14 caracteres' }),
  dataNascimento: z
    .string()
    .min(10, { message: 'A data invalida ex: 01/01/2000' })
    .refine(
      (value) => {
        const [day, month, year] = value.split('/').map(Number)
        const ageAdult = 18

        const birthday = new Date(Date.UTC(year, month - 1, day))

        const today = new Date()
        const age = today.getFullYear() - birthday.getFullYear()

        return age >= ageAdult
      },
      {
        message: 'O cliente deve ter 18 anos ou mais',
      },
    ),
  endereco: z
    .string()
    .trim()
    .toUpperCase()
    .max(100, { message: 'O endereço deve ter no maximo 100 caracteres' }),
})
