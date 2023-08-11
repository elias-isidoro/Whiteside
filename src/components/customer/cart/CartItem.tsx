'use client'

import { buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn, isValidWholeNumber, numberToPriceFormat } from '@/lib/utils';
import { CartItem, useCartStore } from '@/stores/use-cart-store';
import { MinusCircle } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, FC } from 'react';

interface Props {
  item: CartItem
}

const CartItem: FC<Props> = ({item}: Props) => {

  const { deleteItem, updateQuantity } = useCartStore();
  
  const handleRemoveFromCart = () => {
    deleteItem(item.id);
  };

  const changeQuantity = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length>4)return

    if(e.target.value==="" || isValidWholeNumber(e.target.value)){
      updateQuantity(item.id, Number(e.target.value))
    }
  }

  return(
    <div className='group w-full flex flex-row'>

      <div className='relative min-w-[100px] flex-grow h-[40px]'>
        <div className='absolute inset-0 flex flex-row items-center gap-2'>
          <Input
          value={item.quantity}
          onChange={changeQuantity}
          className='w-10 h-auto p-1 text-xs text-center '/>
          <Link href={`/products/view/${item.id}`} className='text-xs min-[455px]:text-sm overflow-hidden whitespace-nowrap text-ellipsis my-auto group-hover:underline cursor-pointer'>
            {item.name}
          </Link>
          <p className='text-xs hidden min-[400px]:block overflow-hidden whitespace-nowrap text-ellipsis pr-4'>{`(${JSON.parse(item.variant.tags).join(', ')})`}</p>
        </div>  
      </div>


      <div className='relative text-xs flex justify-center items-center min-w-[95px] max-w-[95px] min-[455px]:text-sm whitespace-nowrap'>
        <div className='absolute inset-0 flex flex-row items-center gap-2'>
          <p className='text-xs overflow-hidden whitespace-nowrap text-ellipsis my-auto'>
            {`₱ ${numberToPriceFormat(item.variant.price*item.quantity)}`}
          </p>
        </div>  
      </div>

      <div className='flex justify-center items-center pl-2 min-[500px]:pl-10'>
        <MinusCircle onClick={handleRemoveFromCart} className={cn(buttonVariants({variant:'destructive'}),'rounded-full p-0 h-auto w-auto cursor-pointer')}/>
      </div>
    </div> 
  )
}

export default CartItem