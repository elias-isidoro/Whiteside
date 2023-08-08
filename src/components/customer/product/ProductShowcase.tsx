'use client'

import { useMemo } from 'react';
import ProductCard from './ProductCard';
import useFetchAllProducts from '@/queries/products/useFetchAllProducts';
import notFound from '@/app/not-found';
import { useSearchStore } from '@/stores/use-search-store';

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const ProductShowcase = () => {

  const {searchInput} = useSearchStore()
  const {data: products, isLoading: isFetchingAllProducts} = useFetchAllProducts()
  const invisibleChildren = useMemo(() => Array.from({length:4},(_, i) => <ProductCard key={`invisible_${i}`} isInvisible={true}/>), []);

  if(isFetchingAllProducts){
    return <>Loading...</>
  }

  if(!products){
    return notFound()
  }

  return(
    <div className='flex flex-col w-full p-4 gap-4'>
      <h1 className='text-lg font-semibold'>Recommended for you</h1>
      <hr className='w-full mb-4'/>
      <div className='flex flex-wrap w-full h-full gap-4'>
        {products.filter(({ name }) => name.toLowerCase().includes(searchInput.toLowerCase())).map((product)=>(
          <ProductCard key={`product_${product.id}`}  product={product}/>
        ))}
        {invisibleChildren}
      </div>
    </div>
  )
}

export default ProductShowcase