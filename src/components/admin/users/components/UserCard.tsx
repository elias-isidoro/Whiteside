'use client'

import { FC } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Eye } from 'lucide-react'
import { Role, User } from '@prisma/client'
import { buttonVariants } from '@/components/ui/Button'

interface Props {
  user: User & {Role: Role}
}

const UserCard: FC<Props> = ({user}) => {


  return(
    <tr className='group h-[50px]'>
      <td className='relative h-full border-b border-gray-300'>
        <div className='absolute inset-0 flex'>
          <Link 
          key={`click_view_${user.id}`} 
          href={`/management/users/manage/${user.id}`}
          className='text-xs overflow-hidden px-4 whitespace-nowrap text-ellipsis my-auto'>
            {user.username || user.name || 'No Name'}
          </Link>
        </div>  
      </td>

      <td className='hidden min-[350px]:table-cell h-full text-center text-xs border-b border-gray-300'>
        {user.Role?.name || 'No Role'}
      </td>

      <td className='h-full text-center border-b border-gray-300'>
        <div className={'h-full w-full flex justify-center items-center'}>
          <Link 
          key={`view_${user.id}`} 
          href={`/management/users/manage/${user.id}`}
          className={cn(buttonVariants({variant:'ghost'}),'p-0 h-auto w-auto')}>
            <Eye color={'blue'} strokeWidth={'1.5px'}/>
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default UserCard