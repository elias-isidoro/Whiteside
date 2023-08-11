'use client'

import { Button } from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { numberToPriceFormat, productVariantIdSeparator } from '@/lib/utils'
import useFetchProduct from '@/queries/products/useFetchProduct'
import { useCartStore } from '@/stores/use-cart-store'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { Session } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface Props {
  productVariantId: string
  session: Session | null
}

const ProductView: FC<Props> = ({productVariantId, session}) => {

  const {productId, variantId} = productVariantIdSeparator(productVariantId)
  const {data: product, isLoading: isFetchingProduct} = useFetchProduct({productId})
  const { isInCart, toggleItem } = useCartStore()
  const { loginToast, cartToast } = useCustomToast()
  const [variantIndex, setVariantIndex] = useState(product ? (product.variants.findIndex(({id})=>id === variantId) || 0) : 0)
  
  useEffect(()=>{
    if(!product) return
    const variantIndex = product.variants.findIndex(({id})=>id === variantId) || 0
    setVariantIndex(variantIndex)
  },[product, variantId])

  const handleAddToCart = async () => {
    if(!product) return
    
    if(!session){
      return loginToast()
    }

    const {variants, id, ...rest} = product

    const action = toggleItem({ 
      ...rest,
      quantity: 1,
      productId: id,
      variant: variants[0],
      id: productVariantId,
    })

    if(action==='+'){
      cartToast('Item has been added to Cart')
    }else{
      cartToast('Item has been removed to Cart')
    }
  }
  

  if(isFetchingProduct){
    return <Loading/>
  }

  if(!product || product.variants.length===0){
    return notFound()
  }

  const {price, tags, imageUrl} = product.variants[variantIndex]

  return(
    <div className={`flex flex-col h-full w-fit max-w-[250px] min-[600px]:max-w-lg min-w-[100px] gap-4 pt-3 px-2`}>
      <div className='w-full flex flex-row flex-wrap gap-2'>
        <div className='flex flex-col flex-grow items-center gap-2 basis-1/2 min-[600px]:basis-1/3 pt-1 pb-4'>
          <div className={`aspect-square w-full max-h-[250px] min-[600px]:max-h-[300px]`}>
            <img
            alt={`${product.name}'s image`}
            src={imageUrl}
            className={`object-cover w-full h-full `}/>
          </div>
            {product.variants.length>1&&(
              <div className='flex justify-center items-center w-full py-1'>
                <div className='flex flex-row gap-1 h-1.5 w-full'>
                  {product.variants.map(({id},i)=>{
                    if(i === variantIndex)
                      return <div key={`variant_tab_${id}`} className='h-full w-full flex-grow bg-black'/>
                    return <div key={`variant_tab_${id}`} className='flex-grow border-[1.5px] border-black'/>
                  })}
                </div>
              </div>
            )}
        </div>
        
        <div className='flex flex-col w-full min-[600px]:basis-1/3 gap-1 pb-4 overflow-y-auto'>
          <div className='flex flex-col pb-2'>
            <p className='text-md font-semibold'>{product.name}</p>
            <p className='text-[10px] text-gray-500'>Posted by {product.author.username || product.author.name || 'Anonymous'}</p>
          </div>
          <p className='text-[10px] min-[600px]:text-xs text-gray-500'>{product.description}</p>
          <div className='flex flex-row flex-wrap gap-1 py-2 text-[10px] min-[600px]:text-[12px]'>
            <p className={'p-1.5 min-[600px]:p-2 rounded-sm bg-black text-white font-medium'}>Tags:</p>
            {tags.length===0&&<p className={'p-1.5 min-[600px]:p-2 rounded-sm bg-black text-white font-medium'}>None</p>}
            {JSON.parse(tags).map((tag: string)=><p key={`tag_${tag}`} className={'p-1.5 min-[600px]:p-2 rounded-sm bg-black text-white font-medium'}>{tag}</p>)}
          </div>
          
          <p className='text-sm'>₱ {numberToPriceFormat(price)}</p>

          <div className='flex-grow'></div>
          <div className='w-full flex justify-end'>
            <Button variant={!isInCart(productVariantId)?'secondary':'destructive'} onClick={handleAddToCart} className={'flex w-fit gap-1'}>
              {!isInCart(productVariantId)?(
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