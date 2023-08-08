'use client'

import { Icons } from '@/components/ui/Icons'
import { capitalizeFirstLetter, convertEpochToLocalTime, convertFromCents, numberToPriceFormat } from '@/lib/utils'
import useSpecificPayment from '@/queries/payment/useSpecificPayment'
import { CalendarDays, Mail, Phone } from 'lucide-react'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface Props {
  orderId: string
}

const OrderView: FC<Props> = ({orderId}) => {

  const {data:payment, isLoading: isFetchingPayment} = useSpecificPayment({paymentId:orderId})

  if(isFetchingPayment){
    return <>Loading...</>
  }

  if(!payment){
    return notFound()
  }

  const {logo, description} = (()=>{

    const {type, brand, last4} = payment.attributes.source

    let logo = null
    let description = ''

    if(type==='card'){
      if(brand==='mastercard'){
        logo = <Icons.mastercard className='h-7 w-7'/>
      }else if(brand==='visa'){
        logo = <Icons.visa className='h-7 w-7'/>
      }
      description=`Ends at ${last4}`
    }else{
      if(type === 'gcash'){
        logo = <Icons.gcash className='h-7 w-7'/>
      }
      description = type.split('_').map((word)=>capitalizeFirstLetter(word)).join(' ')
    }

    return { logo, description }
  })()

  return(
    <div className='w-full flex flex-col gap-2'>
      <h1 className='text-sm font-semibold min-[400px]:text-lg'>{payment.id}</h1>
      <hr/>
      <div className='w-full h-full flex flex-col min-[650px]:flex-row gap-2 text-sm min-[650px]:text-xs'>

        {/* ---------------- Card 1 ---------------- */}

        <div className='flex flex-col flex-grow basis-[220px] p-4 gap-5'>

          <div className='w-full flex flex-col gap-1'>
            <div className='w-full flex flex-row justify-between items-center gap-2'>
              <h2 className='font-semibold whitespace-nowrap'>Payment Details</h2>
              <p className='border border-green-400 text-green-400 py-0.5 px-6 text-xs rounded-sm'>{payment.attributes.status.toUpperCase()}</p>
            </div>

            <div className='flex flex-row w-full gap-1'>
              <p>Link Reference</p>
              <p className='text-blue-600'>{payment.attributes.external_reference_number}</p>
            </div>
          </div>

          <div className='w-full flex flex-col gap-2'>
            <div className='flex flex-row w-full justify-between'>
              <p>Gross Amount</p>
              <p className='text-gray-600'>{`₱ ${numberToPriceFormat(convertFromCents(payment.attributes.amount))}`}</p>
            </div>

            <div className='flex flex-row w-full justify-between'>
              <p>Fees</p>
              <p>{`- ₱ ${numberToPriceFormat(convertFromCents(payment.attributes.fee))}`}</p>
            </div>

            <hr/>

            <div className='flex flex-row w-full justify-between'>
              <p>Net Amount</p>
              <p>{`₱ ${numberToPriceFormat(convertFromCents(payment.attributes.amount-payment.attributes.fee))}`}</p>
            </div>
          </div>

          <div className='text-xs w-full flex flex-col gap-1'>
            <p className='font-semibold'>Description</p>
            <p>{payment.attributes.description}</p>
          </div>

        </div>

        {/* ---------------- Card 2 ---------------- */}

        <div className='flex flex-col flex-grow basis-[220px] p-4 gap-2 h-auto'>

          <div className='w-full flex flex-row gap-1 items-center'>

            {logo}
            <p>{description}</p>

          </div>

          <div className='w-full flex flex-col'>
            <p>Paid on {convertEpochToLocalTime(payment.attributes.paid_at)}</p>
            <p>Payment Origin: {payment.attributes.source.country}</p>
          </div>

          <div className='p-2 gap-2 w-full flex flex-row bg-blue-100 border-2 border-blue-500 text-blue-500 rounded-md items-center'>
            <div className='p-1'>
              <CalendarDays className='h-6 w-6'/>
            </div>
            <p className='text-xs'>{`You'll receive this payment in your bank account on or before ${convertEpochToLocalTime(payment.attributes.credited_at)}`}</p>
          </div>

        </div>

        {/* ---------------- Card 3 ---------------- */}

        <div className='flex-grow basis-[220px] p-4'>
          
          <h3 className='font-semibold'>Billing Details</h3>
          <br/>
          <div className='w-full flex flex-col gap-1'>
            <p className='font-medium'>{payment.attributes.billing.name}</p>
            <div className='w-full flex flex-col'>
              <p>{payment.attributes.billing.address.line1}</p>
              <p>{payment.attributes.billing.address.line2}</p>
              <p>{payment.attributes.billing.address.city}</p>
              <p>{payment.attributes.billing.address.country}</p>
            </div>
            <br/>
            <div className='flex flex-row gap-1 items-center'>
              <Mail className='h-4 w-4'/>
              <p>{payment.attributes.billing.email}</p>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <Phone className='h-4 w-4'/>
            <p>{payment.attributes.billing.phone}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default OrderView