'use server'
import { Product } from '@/types/product'
import { resourceURLProduct } from '@/ultls/resouce-url-api'

export const getById = async (id: string): Promise<Product> => {
  const response = await fetch(`${resourceURLProduct}/${id}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro inesperado')
  }

  const product = (await response.json()) as Promise<Product>
  return product
}
