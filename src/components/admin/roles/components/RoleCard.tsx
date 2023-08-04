'use client'

import { FC } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Eye } from 'lucide-react'
import { Role } from '@prisma/client'
import { buttonVariants } from '@/components/ui/Button'

interface Props {
  role: Role
}

const RoleCard: FC<Props> = ({role}) => {

  return(
    <tr className='group h-[50px]'>
      <td className='relative h-full border-b border-gray-300'>
        <div className='absolute inset-0 flex'>
          <Link 
          key={`click_edit_role_${role.id}`} 
          href={`/management/roles/edit/${role.id}`}
          className='text-xs overflow-hidden px-4 whitespace-nowrap text-ellipsis my-auto'>
            {role.name}
          </Link>
        </div>  
      </td>

      <td className='h-full text-center border-b border-gray-300'>
        <div className={'h-full w-full flex justify-center items-center'}>
          <Link 
          key={`edit_role_${role.id}`} 
          href={`/management/roles/edit/${role.id}`}
          className={cn(buttonVariants({variant:'ghost'}),'p-0 h-auto w-auto')}>
            <Eye color={'blue'} strokeWidth={'1.5px'}/>
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default RoleCard