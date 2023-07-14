import { FC } from 'react'
import DashTab from './DashTab'

export type Menu = 'Products' | 'Categories' | 'Sales' |'Orders'

interface Props {
  focus: Menu
}

const DashNav: FC<Props> = ({focus}) => {
  return(
    <div className='w-fit flex flex-row flex-wrap gap-[1px] p-[1px] bg-black mb-4'>
      <DashTab href={'/dashboard/products'} focus={focus} text={'Products'}/>
      <DashTab href={'/dashboard/categories'} focus={focus} text={'Categories'}/>
      <DashTab href={'/'} focus={focus} text={'Sales'}/>
      <DashTab href={'/'} focus={focus} text={'Orders'}/>
    </div>
  )
}

export default DashNav