import { FC } from 'react'
import NavTab from './NavTab'

export type DashItems = 'Products' | 'Categories' | 'Sales' | 'Orders'

interface Props {
  focus: DashItems
}

const DashNav: FC<Props> = ({focus}) => {
  return(

    <div className='w-full flex flex-col gap-2'>
      <h1 className='text-xl font-extrabold'>Dashboard</h1>

      <div className='w-fit flex flex-row flex-wrap gap-1 p-1 bg-gray-100 mb-4 border border-gray-400 rounded-md min-[350px]:rounded-sm'>
        <NavTab href={'/dashboard/sales'} focus={focus} text={'Sales'}/>
        <NavTab href={'/dashboard/orders'} focus={focus} text={'Orders'}/>
        <NavTab href={'/dashboard/products'} focus={focus} text={'Products'}/>
        <NavTab href={'/dashboard/categories'} focus={focus} text={'Categories'}/>
      </div>
    </div>
    
  )
}

export default DashNav