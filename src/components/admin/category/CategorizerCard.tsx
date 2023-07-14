'use client'

import { useCategorizerStore } from '@/hooks/use-categorizer-store'
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
      className='relative flex-grow flex flex-col gap-1 basis-1/3 min-[500px]:basis-1/4 min-[750px]:basis-1/5 min-[1000px]:basis-1/6 min-[1250px]:basis-1/7'
    >
      {(product && !isInvisible) && (
        <>
          {cardRef.current?.getAttribute('data-selected') === 'true' && <CheckCircle2 className='absolute top-1 right-1 h-9 w-9 border-[3px] border-green-400 rounded-full p-0' color='white'/>}
        
          <img
            alt={`${product.name} preview`}
            src={product.variants[0].imageUrl}
            className='object-cover w-full flex-grow rounded-md'
          />
            
          <div className='w-full p-1'>
            <p className='text-sm font-semibold'>{product.name}</p>
            <p className='text-xs'>{product.description}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default CategorizerCard