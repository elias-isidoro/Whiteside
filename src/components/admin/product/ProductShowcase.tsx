'use client'

import Link from 'next/link';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import ProductCard from './ProductCard';
import { buttonVariants } from '@/components/ui/Button';
import useFetchAllProducts from '@/queries/products/useFetchAllProducts';
import { useUnsavedProductStore } from '@/stores/use-unsaved-product-store';
import { notFound } from 'next/navigation';
import Loading from '@/components/ui/Loading';

const ProductShowcase = () => {

  const {resetStates} = useUnsavedProductStore()
  const {data: products, isLoading: isFetchingAllProducts} = useFetchAllProducts()
  const invisibleChildren = useMemo(() => Array.from({length:4},(_, i) => <ProductCard key={`invisible_${i}`} isInvisible={true}/>), []);

  if(isFetchingAllProducts){
    return <Loading/>
  }

  if(!products){
    return notFound()
  }

  return(
    <div className='flex flex-col w-full gap-4'>
      <div className='flex flex-row w-full'>
        <Link onClick={resetStates} href={'/dashboard/products/create'} className={cn(buttonVariants(),'gap-2 pl-2')}>
          <Plus className='h-6 w-6'/>
          <p className='text-xs'>Create new product</p>
        </Link>
      </div>

      <div className='flex flex-wrap w-full h-full gap-4'>
        {products&&products.map((product)=>(
          <ProductCard key={`product_${product.id}`}  product={product}/>
        ))}
        {invisibleChildren}
      </div>
    </div>
  )
}

export default ProductShowcase