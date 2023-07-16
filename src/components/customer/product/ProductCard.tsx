'use client'

import type { FC } from 'react';
import type { Product, Variant } from '@prisma/client';
import Link from 'next/link';
import { numberToPriceFormat } from '@/lib/utils';

interface Props {
  isInvisible?: boolean
  product?: (Product & {
    variants: Variant[]
  })
}

const ProductCard: FC<Props> = ({isInvisible=false, product}) => {

  return(
    <Link href={`/`} className={`group relative  ${isInvisible?'h-0':'aspect-[5/6]'} flex flex-col flex-grow outline-[1px] basis-1/2 min-[400px]:basis-1/3 min-[600px]:basis-1/4 min-[800px]:basis-1/5 min-[1000px]:basis-1/6 justify-center items-center h-full rounded-md ${isInvisible?'cursor-none':'cursor-pointer'}`}>
      {(!isInvisible&&product&&product.variants.length>0) && (
        <>
          <div className='relative w-full flex-grow'>
            <div className='absolute inset-0'>
              <img 
              alt={'product preview'} 
              src={product.variants[0].imageUrl} 
              className='w-full h-full object-cover rounded-md group-hover:rounded-b-none'/>
            </div>
          </div>

          <div className='relative w-full h-[70px]'>
            <div className='absolute inset-0 flex flex-col p-1'>
              <p className='text-sm overflow-hidden whitespace-nowrap text-ellipsis my-auto'>
                {product.name}
              </p>
               <p className='text-xs text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis my-auto'>
                {product.description}
              </p>
              <p className='text-sm overflow-hidden whitespace-nowrap text-ellipsis my-auto'>
                ₱ {numberToPriceFormat(product.variants[0].price)}
              </p>
            </div>
          </div>
        </>
      )}
    </Link>
  )
}

export default ProductCard