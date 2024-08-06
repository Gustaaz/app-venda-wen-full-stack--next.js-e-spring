export type Page<T> = {
  content: T[]
  size: number
  number: number
  totalElements: number
  first: number
  totalPages: number
}
