'use client'

import useFetchProduct from '@/queries/products/useFetchProduct'
import { FC } from 'react'

interface Props {
  productId: string
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const ProductView: FC<Props> = ({productId}) => {

  const {data: product, isLoading: isFetchingProduct} = useFetchProduct({productId})
  
  return(
    <div className='w-full p-4'>
      {isFetchingProduct?
      <>Is fetching product...</> 
      :
      <>
        {product?
        <div>{product.name}</div>
          :
        <div>{'Product does not exist'}</div>
        }
      </>
     }
    </div>
  )
}

export default ProductView