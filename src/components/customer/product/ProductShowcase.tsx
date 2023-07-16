'use client'

import { useMemo } from 'react';
import ProductCard from './ProductCard';
import useFetchAllProducts from '@/queries/products/useFetchAllProducts';

const ProductShowcase = () => {

  const {data: products, isLoading: isFetchingAllProducts} = useFetchAllProducts()
  const invisibleChildren = useMemo(() => Array.from({length:4},(_, i) => <ProductCard key={`invisible_${i}`} isInvisible={true}/>), []);

  return(
    <div className='flex flex-col w-full p-4 gap-4'>
      <h1 className='text-lg font-semibold'>Recommended for you</h1>
      <hr className='w-full mb-4'/>
      {isFetchingAllProducts?
      <>{'Fetching all Products...'}</>:
      <div className='flex flex-wrap w-full h-full gap-4'>
        {products&&products.map((product)=>(
          <ProductCard key={`product_${product.id}`}  product={product}/>
        ))}
        {invisibleChildren}
      </div>
      }
    </div>
  )
}

export default ProductShowcase