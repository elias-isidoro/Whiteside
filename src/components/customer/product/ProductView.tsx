'use client'

import { Button } from '@/components/ui/Button'
import { numberToPriceFormat, toastDefault } from '@/lib/utils'
import useFetchProduct from '@/queries/products/useFetchProduct'
import { useCartStore } from '@/stores/use-cart-store'
import { Circle, Minus, Plus, ShoppingCart } from 'lucide-react'
import { nanoid } from 'nanoid'
import { notFound } from 'next/navigation'
import { FC, useMemo } from 'react'

interface Props {
  productId: string
}

const ProductView: FC<Props> = ({productId}) => {

  const {data: product, isLoading: isFetchingProduct} = useFetchProduct({productId})
  const { isInCart, toggleItem } = useCartStore()
  const itemId = useMemo(()=>{
    if(!product) return nanoid()
    return `${product.id}${product.variants[0].id}`
  },[product])

  const handleAddToCart = () => {
    if(!product) return
    
    const {variants, id, ...rest} = product

    const action = toggleItem({ 
      ...rest,
      quantity: 1,
      variant: variants[0],
      productId: id,
      id: `${id}${variants[0].id}`,
    })

    if(action==='+'){
      toastDefault('','Item has been added to Cart')
    }else{
      toastDefault('','Item has been removed to Cart')
    }
  }


  if(isFetchingProduct){
    return <>Loading...</>
  }

  if(!product || product.variants.length===0){
    return notFound()
  }

  const {price, tags, imageUrl} = product.variants[0]

  return(
    <div className={`flex flex-col h-full w-fit max-w-lg min-w-[100px] gap-4 pt-3 px-2`}>
      <div className='w-full flex flex-row flex-wrap gap-2'>
        <div className='flex flex-col flex-grow justify-center items-center max-w-[300px] gap-2 basis-1/2 min-[350px]:basis-1/3'>
          <div className={`aspect-square w-full`}>
            <img
            alt={`${product.name}'s image`}
            src={imageUrl}
            className={`object-cover w-full h-full`}/>
          </div>
          <div className='flex gap-1 h-2.5'>
            {product.variants.length>1&&product.variants.map(({id})=><Circle key={`circle_${id}`} className='h-full aspect-square'/>)}
          </div>
        </div>
        
        <div className='flex flex-col w-full min-[350px]:basis-1/3 gap-1 pb-4'>
          <p className='text-md font-semibold'>{product.name}</p>
          <p className='text-xs text-gray-500'>{product.description}</p>
          <div className='flex flex-row flex-wrap gap-1'>
            <p className={'text-[10px] p-1 min-[400px]:text-xs min-[400px]:p-2 rounded-sm bg-black text-white font-medium'}>Tags:</p>
            {tags.length===0&&<p className={'text-[10px] p-1 min-[400px]:text-xs min-[400px]:p-2 rounded-sm bg-black text-white font-medium'}>None</p>}
            {JSON.parse(tags).map((tag: string)=><p key={`tag_${tag}`} className={'text-[10px] p-1 min-[400px]:text-xs min-[400px]:p-2 rounded-sm bg-black text-white font-medium'}>{tag}</p>)}
          </div>
          
          <p className='text-sm'>₱ {numberToPriceFormat(price)}</p>

          <div className='flex-grow'></div>
          <div className='w-full flex justify-end'>
            <Button variant={!isInCart(itemId)?'secondary':'destructive'} onClick={handleAddToCart} className={'flex w-fit gap-1'}>
              {!isInCart(itemId)?(
                <Plus className='h-5 w-5'/>
              ):(
                <Minus className='h-5 w-5'/>
              )}
              <ShoppingCart className='h-5 w-5'/>
            </Button>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default ProductView