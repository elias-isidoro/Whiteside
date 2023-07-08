'use client'

import type { Product, Variant } from '@prisma/client';
import { X } from 'lucide-react';
import { FC } from 'react'
import { useMutation } from '@tanstack/react-query';
import { toastDefault, toastError } from '@/lib/utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from "next/navigation";
import { useCustomToast } from '@/hooks/use-custom-toast';
import { DeleteProductPayload } from '@/lib/validators/product';

interface Props {
  isInvisible?: boolean
  product?: (Product & {
    variants: Variant[]
  })
}

const ProductCard: FC<Props> = ({isInvisible=false, product}) => {

  
  const router = useRouter();
  const {loginToast} = useCustomToast();

  const handleClickX = () => {
    if(!product) return
    deleteProduct({id: product.id})
  }

  const { mutate: deleteProduct, isLoading: isDeletingProduct } = useMutation({
    mutationFn: async (payload:DeleteProductPayload) => {
      const {data} = await axios.delete('/api/product', {params:payload})
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
      }
      return toastError('There was an error.','Could not delete product.')
    },

    onSuccess: () => {
      router.refresh()
      toastDefault('Cheers!','Product has been successfully deleted!')
    }
  })

  return(
    <div 
    className={`relative aspect-square flex flex-col flex-grow basis-1/3 min-[500px]:basis-1/4 min-[750px]:basis-1/5 min-[1000px]:basis-1/6 min-[1250px]:basis-1/7 justify-center items-center h-full rounded-md ${!isInvisible&&'hover:shadow-md'}`}
    style={{
    height:isInvisible?'0px':undefined, 
    cursor:isInvisible?'none':'pointer'}}>
      {!isInvisible && (
        <>
        <div className='absolute w-full h-full flex flex-col items-center justify-center gap-1 rounded-md bg-zinc-900/0 opacity-0 hover:opacity-100'>
          <button onClick={handleClickX} className='absolute right-0 top-0' disabled={isDeletingProduct}>
            <X className='h-6 w-6 bg-white rounded-full border p-1 border-black m-0.5 text-black hover:text-red-800 hover:border-gray-700'/>
          </button>
        </div>

        {(product&&product.variants.length>0)?
          <img 
          alt={'product preview'} 
          src={product.variants[0].imageUrl} 
          className='object-cover w-full flex-grow rounded-md'/>:
          <div className='w-full flex-grow rounded-md'/>
          }

          {product&&product.name&&(
            <div className='relative w-full h-[32px]'>
              <div className='absolute inset-0 flex'>
                <p className='text-sm overflow-hidden p-1 whitespace-nowrap text-ellipsis my-auto'>
                  {product.name}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductCard