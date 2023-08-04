'use client'

import notFound from '@/app/not-found';
import RoleCard from './components/RoleCard';
import useFetchAllRoles from '@/queries/role/useFetchAllRoles';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

const RolesShowcase = () => {

  const {data: roles, isLoading: isFetchingRoles} = useFetchAllRoles()

  if(isFetchingRoles){
    return <>Loading...</>
  }

  if(!roles){
    return notFound()
  }

  return (
    <div className='w-full pb-12'>
      <div className='flex flex-col w-full pb-4 gap-4'>
        <div className='flex flex-row w-full'>
          <Link href={'/management/roles/create'} className={cn(buttonVariants(),'gap-2 pl-2')}>
            <Plus className='h-6 w-6'/>
            <p className='text-xs'>Create new role</p>
          </Link>
        </div>

        <div className='w-full text-sm'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='h-[50px]'>
                <td width={'90%'} className='px-4 h-full text-xs font-semibold border-b border-gray-300'>Name</td>
                <td width={'10%'} className='px-4 h-full text-xs font-semibold text-center border-b border-gray-300'>Action</td>
              </tr>
            </thead>
            <tbody>
              {roles.map((role)=>(<RoleCard key={`order_${role.id}`} role={role}/>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RolesShowcase