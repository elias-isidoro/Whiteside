'use client'

import usePaymentLink from '@/queries/payment/usePaymentLink'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface Props {
  
}

const PaymentLink: FC<Props> = ({}) => {

  const { data: link, isLoading: isFetchingLink } = usePaymentLink()

  if(isFetchingLink){
    return <>Loading...</>
  }

  if(!link){
    return notFound()
  }

  return(
    <div className=''>
      Payment Intent
    </div>
  )
}

export default PaymentLink