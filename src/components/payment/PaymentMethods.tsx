'use client'

import useGetPaymentMethods from '@/queries/payment/useGetPaymentMethods'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface Props {
  
}

const PaymentMethods: FC<Props> = ({}) => {

  const { data: methods, isLoading: isFetchingMethods } = useGetPaymentMethods()

  if(isFetchingMethods){
    return <>Loading...</>
  }

  if(!methods){
    return notFound()
  }

  console.log(methods)

  return(
    <div className=''>
      PaymentMethods
    </div>
  )
}

export default PaymentMethods