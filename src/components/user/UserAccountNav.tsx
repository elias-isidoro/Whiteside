'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'
import UserAvatar from './UserAvatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/DropdownMenu'
import LoginButtons from '../navbar/LoginButtons'
import LoginDropdown from '../navbar/LoginDropdown'

interface Props {
  session?: Session | null
}

const UserAccountNav: FC<Props> = ({session}) => {


  if(!session || !session.user){
    return (
      <>
      <LoginButtons/>
      <LoginDropdown/>
      </>
    )
  }

  const {user} = session

  return(
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex flex-row items-center gap-2'>
          <UserAvatar 
            className='h-8 w-8 border border-black'
            user={{
              name: user.name || null,
              image: user.image || null,
            }}/>
          <p className='hidden text-sm text-gray-700 font-medium min-[600px]:block max-w-[55px] overflow-hidden whitespace-nowrap text-ellipsis'>
            {user.username || user.name || 'Anonymous'}
          </p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white' align='end'>

        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            <p className='font-medium'>{user.username || user.name || 'Anonymous'}</p>
            {user.email && <p className='w-[200px] truncate text-sm text-zinc-700'>{user.email}</p>}
          </div>
        </div>

        <DropdownMenuSeparator/>

        <DropdownMenuItem asChild>
          <Link href='/'>Home</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/profile/${session.user.id}`}>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/cart'>My Cart</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/dashboard/sales'>Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/management/users'>User Management</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator/>
        
        <DropdownMenuItem 
          onSelect={(event)=>{
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`
            })
          }}
          className='cursor-pointer'>
          Sign out
        </DropdownMenuItem>

      </DropdownMenuContent>


    </DropdownMenu>
  )
}

export default UserAccountNav