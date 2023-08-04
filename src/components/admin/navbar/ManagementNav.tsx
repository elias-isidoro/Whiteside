import { FC } from 'react'
import NavTab from './NavTab'

export type ManagementItems = 'Users' | 'Roles'

interface Props {
  focus: ManagementItems
}

const ManagementNav: FC<Props> = ({focus}) => {
  return(

    <div className='w-full flex flex-col gap-2'>
      <h1 className='text-xl font-extrabold'>User Management</h1>

      <div className='w-fit flex flex-row flex-wrap gap-1 p-1 bg-gray-100 mb-4 border border-gray-400 rounded-md min-[350px]:rounded-sm'>
        <NavTab href={'/management/users'} focus={focus} text={'Users'}/>
        <NavTab href={'/management/roles'} focus={focus} text={'Roles'}/>
      </div>
    </div>
    
  )
}

export default ManagementNav