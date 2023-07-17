'use client'

import { FC, useEffect, useMemo } from 'react';
import CategorizerCard from './CategorizerCard';
import { Button } from '@/components/ui/Button';
import { Check, MousePointer2 } from 'lucide-react';
import { useCategorizerStore } from '@/hooks/use-categorizer-store';
import useCategorizeProducts from '@/queries/categorizer/useCategorizeProducts';
import useFetchProductsNotUnder from '@/queries/categorizer/useFetchProductsNotUnder';
import useFetchCategory from '@/queries/categories/useFetchCategory';
import { notFound } from 'next/navigation';
import LoadingPage from '@/layouts/LoadingPage';

interface Props {
  categoryId: string
}


const Categorizer: FC<Props> = ({categoryId}) => {


  const { selectedProducts, resetAllStates } = useCategorizerStore()
  const { data: category, isLoading: isFetchingCategory} = useFetchCategory({categoryId});
  const { mutate: categorizeProducts, isLoading: isCategorizing } = useCategorizeProducts();
  const { data: products, isLoading: isFetchingProducts } = useFetchProductsNotUnder({categoryId});

  const invisibleChildren = useMemo(() => Array.from({length:4},(_, i) => 
    <CategorizerCard key={`invisible_${i}`} isInvisible={true}/>), []);

  useEffect(()=>resetAllStates,[resetAllStates])

  if(!category) return notFound()

  const handleClick = () => {
    categorizeProducts({ selectedProducts, categoryId: category.id })
    resetAllStates()
  }

  return (
    <LoadingPage isLoading={isFetchingCategory} focus={category} loader={<div>bruh...</div>}>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex flex-row gap-1 items-center pl-1'>
          <MousePointer2 className='w-6 h-6'/>
          <h1 className='text-lg font-semibold'>Select Products</h1>
        </div>

        <hr/>

        <div className='w-full py-2'>
          <Button 
          onClick={handleClick}
          isLoading={isCategorizing}
          variant={'secondary'}
          disabled={selectedProducts.length===0 || isCategorizing}
          className='w-fit gap-1 pl-[9px] text-xs'>
            {!isCategorizing&&<Check className='h-5 w-5'/>}
            {`List under ${category.name}`}
          </Button>
        </div>
        <div className='flex flex-row flex-wrap w-full gap-2'>
          {isFetchingProducts?
            <>{'Fetching Products...'}</>
          :
            <>
              {products&&products.length>0?
              <>
                {products.map((product)=>(<CategorizerCard key={`categorize_${category.id}_${product.id}`} product={product}/>))}
                {invisibleChildren}
              </>
              :
              <p className='w-full text-sm border border-black p-4'>List is empty...</p>
              }
            </>
          }
        </div>
      </div>
    </LoadingPage>
  )
}

export default Categorizer