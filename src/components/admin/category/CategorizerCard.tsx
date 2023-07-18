'use client'

import { useCategorizerStore } from '@/hooks/use-categorizer-store'
import { numberToPriceFormat } from '@/lib/utils'
import { Product, Variant } from '@prisma/client'
import { CheckCircle2 } from 'lucide-react'
import { useRef } from 'react'

interface Props {
  product?: (Product & { variants: Variant[] })
  isInvisible?: boolean
}

const CategorizerCard = ({ product, isInvisible = false }:Props) => {
  const { addSelectedProducts, removeSelectedProduct } = useCategorizerStore()
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!product) return;

    const isSelected = cardRef.current?.getAttribute('data-selected') === 'true';

    if (isSelected) {
      cardRef.current?.setAttribute('data-selected', 'false');
      removeSelectedProduct(product.id);
    } else {
      cardRef.current?.setAttribute('data-selected', 'true');
      addSelectedProducts(product.id);
    }
  }

  return(
    <div 
      onClick={handleClick}
      ref={cardRef}
      data-selected="false"
      className={`group relative  ${isInvisible?'h-0':'aspect-[5/6]'} flex flex-col flex-grow basis-1/2 min-[400px]:basis-1/3 min-[600px]:basis-1/4 min-[800px]:basis-1/5 min-[1000px]:basis-1/6 justify-center items-center h-full rounded-md ${isInvisible?'cursor-none':'cursor-pointer'}`}>
      {(product && !isInvisible) && (
        <>
          {cardRef.current?.getAttribute('data-selected') === 'true' && <CheckCircle2 className='absolute z-10 top-1 right-1 h-9 w-9 border-[3px] border-green-400 rounded-full p-0' color='white'/>}
        
          <div className='relative w-full flex-grow'>
            <div className='absolute inset-0'>
              <img 
              alt={'product preview'} 
              src={product.variants[0].imageUrl} 
              className='w-full h-full object-cover rounded-md'/>
            </div>
          </div>
            
          <div className='relative w-full h-[70px]'>
            <div className='absolute inset-0 flex flex-col p-1'>
              <p className='text-sm font-semibold overflow-hidden whitespace-nowrap text-ellipsis my-auto'>
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
    </div>
  )
}

export default CategorizerCard