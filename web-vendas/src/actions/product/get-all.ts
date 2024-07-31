'use server'
import { Product } from '@/types/product'
import { resourceURLProduct } from '@/ultls/resouce-url-product'

export const getAll = async (): Promise<Product[]> => {
  const response = await fetch(resourceURLProduct, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro inesperado')
  }

  const products = (await response.json()) as Promise<Product[]>
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return products
}
