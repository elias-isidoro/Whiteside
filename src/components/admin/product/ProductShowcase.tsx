import type { Product, Variant } from '@prisma/client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import ProductCard from './ProductCard';

interface Props {
  products:(Product & {
    variants: Variant[]
  })[]
}

const ProductShowcase: FC<Props> = ({products}) => {


  const invisibleChildren = useMemo(() => Array.from({length:3},(_, i) => <ProductCard key={`invisible_${i}`} isInvisible={true}/>), []);

  if(!products) return null

  return(
    <div className='flex flex-wrap items-center h-full w-full py-4 gap-2'>
      <div className='flex flex-wrap w-full h-full gap-4'>

        {products.map((product)=>(<ProductCard key={`product_${product.id}`} product={product}/>))}

        <div className='group relative aspect-square flex flex-col flex-grow basis-1/3 min-[500px]:basis-1/4 min-[750px]:basis-1/5 justify-center items-center h-full rounded-md hover:shadow-md'>
          <Link 
          href={`/dashboard/create-a-product`} 
          className={`flex w-full flex-grow border-2 border-gray-600 rounded-md group-hover:border-black`}>
            <Plus className='h-6 w-6 p-0 m-auto text-gray-600 group-hover:text-black'/>
          </Link>
          <Link href={`/dashboard/create-a-product`} className='relative w-full h-[32px]'>
            <div className='absolute inset-0 flex'>
              <p className='text-sm overflow-hidden p-1 whitespace-nowrap text-ellipsis text-gray-600 my-auto group-hover:text-black'>Create a Product</p>
            </div>
          </Link>
        </div>
        
        
        {invisibleChildren}

      </div>
    </div>
  )
}

export default ProductShowcase