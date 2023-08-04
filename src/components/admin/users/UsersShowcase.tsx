'use client'

import notFound from '@/app/not-found';
import useFetchAllUsers from '@/queries/user/useFetchAllUsers';
import UserCard from './components/UserCard';

const UsersShowcase = () => {

  const {data: users, isLoading: isFetchingUsers} = useFetchAllUsers()

  if(isFetchingUsers){
    return <>Loading...</>
  }

  if(!users){
    return notFound()
  }

  return (
    <div className='w-full pb-12'>
      <div className='flex flex-col w-full gap-4'>
        <div className='w-full text-sm'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='h-[50px]'>
                <td width={'60%'} className='px-4 h-full text-xs font-semibold border-b border-gray-300'>Name</td>
                <td width={'30%'} className='px-2 h-full text-xs font-semibold hidden min-[350px]:table-cell border-b border-gray-300'>Role</td>
                <td width={'10%'} className='px-2 h-full text-xs font-semibold text-center border-b border-gray-300'>Action</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user)=>(<UserCard key={`user_${user.id}`} user={user}/>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UsersShowcase