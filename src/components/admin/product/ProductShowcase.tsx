'use client'

import Link from 'next/link';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import ProductCard from './ProductCard';
import { buttonVariants } from '@/components/ui/Button';
import useFetchAllProducts from '@/queries/products/useFetchAllProducts';
import { useUnsavedProductStore } from '@/stores/use-unsaved-product-store';

const ProductShowcase = () => {

  const {resetStates} = useUnsavedProductStore()
  const {data: products, isLoading: isFetchingAllProducts} = useFetchAllProducts()
  const invisibleChildren = useMemo(() => Array.from({length:4},(_, i) => <ProductCard key={`invisible_${i}`} isInvisible={true}/>), []);

  return(
    <div className='flex flex-col w-full p-4 border border-black gap-4'>
      <div className='flex flex-row w-full'>
        <Link onClick={resetStates} href={'/dashboard/products/create'} className={cn(buttonVariants(),'gap-2 pl-2')}>
          <Plus className='h-6 w-6'/>
          <p className='text-xs'>Create new product</p>
        </Link>
      </div>

      {isFetchingAllProducts?
        <>{'Fetching all Products...'}</>:
        <div className='flex flex-wrap w-full h-full gap-4'>
          {products&&products.map((product)=>(
            <ProductCard key={`product_${product.id}`}  product={product}/>
          ))}
            <Link 
            onClick={resetStates}
            href={`/dashboard/products/create`} 
            className='group relative aspect-[5/6] flex flex-col flex-grow basis-1/2 min-[400px]:basis-1/3 min-[600px]:basis-1/4 min-[800px]:basis-1/5 min-[1000px]:basis-1/6 justify-center items-center h-full'>
              <div className={`flex w-full flex-grow border-2 border-gray-600 rounded-md group-hover:border-black`}>
                <Plus className='h-6 w-6 p-0 m-auto text-gray-600 group-hover:text-black'/>
              </div>
              <div className='relative w-full h-[70px]'>
                <div className='absolute inset-0 flex flex-col p-1'>
                  <p className='text-sm overflow-hidden p-1 whitespace-nowrap text-ellipsis text-gray-600 group-hover:text-black'>Create a Product</p>
                </div>
              </div>
            </Link>
          {invisibleChildren}
        </div>
      }
    </div>
  )
}

export default ProductShowcase