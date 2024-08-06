'use server'

import { resourceURLCustomer } from '@/ultls/resouce-url-api'
import { revalidatePath } from 'next/cache'

export const deleteById = async (id: number): Promise<void> => {
  const url = `${resourceURLCustomer}/${id}`
  const response = await fetch(url, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro inesperado')
  }

  revalidatePath('/inicio/clientes')
}
