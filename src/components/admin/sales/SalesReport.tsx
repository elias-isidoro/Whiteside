'use client'

import SalesNumbers from "./SalesNumbers"
import SalesChart from "./components/SalesChart"


const SalesReport = () => {

  // eslint-disable-next-line no-unused-vars
  // const {data: payment, isLoading: isFetchingPayments } = useAllPayments()

  return(
    <div className='flex flex-col w-full gap-4 min-[700px]:flex-row min-[700px]:flex-wrap'>
      <SalesNumbers/>
      <SalesChart/>
    </div>
  )
}

export default SalesReport