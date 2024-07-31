'use server'
import { Product } from '@/types/product'
import { resourceURLProduct } from '@/ultls/resouce-url-product'
import { revalidatePath } from 'next/cache'

export const update = async (product: Product): Promise<Product> => {
  const url = `${resourceURLProduct}/${product.id}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error('Unexpected error')
  }

  revalidatePath('/inicio/produtos')

  return product
}
