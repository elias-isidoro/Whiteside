'use client'

import { buttonVariants } from '@/components/ui/Button'
import { capitalizeFirstLetter, cn, convertFromCents, numberToPriceFormat } from '@/lib/utils'
import { Payment } from '@/types/payment'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  order: Payment
}

const OrderCard: FC<Props> = ({order}) => {

  return(
    <tr className='group h-[50px]'>
      <td className='relative h-full border-b border-gray-300'>
        <div className='absolute inset-0 flex'>
          <Link 
          key={`click_view_${order.id}`} 
          href={`/dashboard/orders/${order.id}`}
          className='text-xs overflow-hidden px-4 whitespace-nowrap text-ellipsis my-auto'>
            {order.id}
          </Link>
        </div>  
      </td>

      <td className='h-full text-xs border-b border-gray-300 whitespace-nowrap text-ellipsis'>
        ₱ {numberToPriceFormat(convertFromCents(order.attributes.amount)
        -(order.attributes.refunds.length>0 ? convertFromCents(order.attributes.refunds[0].attributes.amount):0)
        -(order.attributes.fee ? convertFromCents(order.attributes.fee) : 0))}
      </td>

      <td className='hidden min-[350px]:table-cell h-full text-xs text-center border-b border-gray-300'>
        {order.attributes.source.type.split('_').map((word)=>capitalizeFirstLetter(word)).join(' ')}
      </td>

      <td className='h-full text-xs text-center border-b border-gray-300'>
        {order.attributes.refunds.length===0?(
          capitalizeFirstLetter(order.attributes.status)
        ):(
          <p>{'Partially Refunded'}</p>
        )}
      </td>

      <td className='h-full text-center border-b border-gray-300'>
        <div className={'h-full w-full flex justify-center items-center'}>
          <Link 
          key={`view_${order.id}`} 
          href={`/dashboard/orders/${order.id}`}
          className={cn(buttonVariants({variant:'ghost'}),'p-0 h-auto w-auto')}>
            <Eye color={'blue'} strokeWidth={'1.5px'}/>
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default OrderCard