import { ProductSize } from '../types'

const productSizeName = (size: ProductSize): string => {
  if (size === ProductSize.SMALL) return 'Small'
  if (size === ProductSize.MEDIUM) return 'Medium'
  if (size === ProductSize.LARGE) return 'Large'
  return ''
}

export default productSizeName
