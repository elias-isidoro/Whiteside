'use client'

import notFound from '@/app/not-found';
import OrderCard from './components/OrderCard';
import useAllPayments from '@/queries/payment/useAllPayments';
import Loading from '@/components/ui/Loading';

const OrdersShowcase = () => {

  const {data: payments, isLoading: isFetchingPayments} = useAllPayments()

  if(isFetchingPayments){
    return <Loading/>
  }

  if(!payments){
    return notFound()
  }

  return (
    <div className='w-full pb-12'>
      <div className='flex flex-col w-full py-4 gap-4'>
        <div className='w-full text-sm'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='h-[50px]'>
                <td width={'30%'} className='px-4 h-full text-xs font-semibold border-b border-gray-300'>ID</td>
                <td width={'20%'} className='px-2 h-full text-xs font-semibold border-b border-gray-300'>Net</td>
                <td width={'20%'} className='hidden min-[350px]:table-cell px-2 h-full text-xs font-semibold text-center border-b border-gray-300'>Type</td>
                <td width={'20%'} className='px-2 h-full text-xs font-semibold text-center border-b border-gray-300'>Status</td>
                <td width={'10%'} className='px-2 h-full text-xs font-semibold text-center border-b border-gray-300'>Action</td>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment)=>(<OrderCard key={`order_${payment.id}`} order={payment}/>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrdersShowcase