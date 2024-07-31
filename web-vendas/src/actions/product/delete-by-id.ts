'use server'
import { resourceURLProduct } from '@/ultls/resouce-url-product'
import { revalidatePath } from 'next/cache'

export const deleteById = async (id: number): Promise<void> => {
  const url = `${resourceURLProduct}/${id}`
  const response = await fetch(url, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro inesperado')
  }

  revalidatePath('/inicio/produtos')
}
