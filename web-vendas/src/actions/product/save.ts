'use server'
import { Product } from '@/types/product'
import { resourceURLProduct } from '@/ultls/resouce-url-product'
import { revalidatePath } from 'next/cache'

export const save = async (product: Product): Promise<Product> => {
  const response = await fetch(resourceURLProduct, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro inesperado')
  }

  const productResponse = (await response.json()) as Promise<Product>
  revalidatePath('/inicio/produtos')

  return productResponse
}
