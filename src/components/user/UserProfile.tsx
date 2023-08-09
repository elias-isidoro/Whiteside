'use client'

import { Button } from '@/components/ui/Button'
import { ComboBox } from '@/components/ui/ComboBox'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import UserAvatar from '@/components/user/UserAvatar'
import useFetchAllRoles from '@/queries/role/useFetchAllRoles'
import useFetchUser from '@/queries/user/useFetchUser'
import useUpdateUserProfile from '@/queries/user/useUpdateUserProfile'
import { notFound, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Loading from '../ui/Loading'

interface Props {
  userId: string
}

interface RoleValue {
  id: string | null,
  name: string,
  canManageOrders: boolean,
  canManageProducts: boolean,
  canManageCategories: boolean,
  canViewSalesAndAnalytics: boolean
}

const NO_ROLE_VALUE = {
  id: null,
  name: "No Role",
  canManageOrders: false,
  canManageProducts: false,
  canManageCategories: false,
  canViewSalesAndAnalytics: false
}

const UserProfile: FC<Props> = ({userId}) => {

  const router = useRouter();
  const {data: user, isLoading: isFetchingUser, refetch: refetchUser} = useFetchUser({userId})
  const {data: roles, isLoading: isFetchingAllRoles} = useFetchAllRoles()
  
  const [userRole, setUserRole] = useState<RoleValue>(user ? (user.Role || NO_ROLE_VALUE) : NO_ROLE_VALUE)
  const [username, setUsername] = useState(user ? (user.username || user.name || 'Anonymous') : 'Anonymous')

  const {mutate: updateUserRole, isLoading: isUpdatingUserRole} = useUpdateUserProfile({
    onSuccessCallback: () => {
      router.back()
      refetchUser()
    }
  })
  
  useEffect(()=>{
    if(!user) return
    setUserRole(user.Role || NO_ROLE_VALUE)
    setUsername(user.username || user.name || 'Anonymous')
  },[user, isFetchingUser])
  
  const handleRoleChange = (roleId: string) => {
    if(!roles) return
    const role = roles.find((role)=>role.id==roleId)
    setUserRole(()=>{
      if(role && role.id!==userRole.id) return role
      return NO_ROLE_VALUE
    })
  }

  if(isFetchingUser || isFetchingAllRoles) return <Loading/>
  if(!user || !roles) return notFound()

  const handleUpdateRole = () => updateUserRole({id: userId, roleId: userRole.id, username})

  return(
    <div className='flex flex-col w-full gap-5 p-2 pb-0 max-w-sm'>

      <div className='flex flex-col w-full items-center justify-center'>
        <UserAvatar 
          className='h-16 w-16 border border-black'
          user={{
            name: user.username || user.name || 'No name',
            image: user.image || null,
          }}/>

        <input
        onChange={(e) => {
          const input = e.target.value;
          const filteredInput = input.replace(/[^a-zA-Z0-9]/g, '').slice(0, 21);
          setUsername(filteredInput);
        }}
        value={username}
        className="w-full text-sm font-medium text-center border-none outline-none p-2"/>
          

        <ComboBox
        id='role-changer'
        className='text-xs font-semibold text-blue-600 w-fit p-2 pl-3.5'
        value={userRole.id || '-1'}
        onUpdate={handleRoleChange}
        boxPlaceholder={userRole.name}
        defaultPlaceHolder={'No Role'}
        searchPlaceholder="Search Role"
        emptyPlaceholder="No roles found."
        itemset={roles.map(({id, name})=>({ value: id, label: name }))}/>
      </div>

      <hr className='bg-zinc-500 h-px'/>

      <div className='flex flex-col w-full gap-2 m-auto'>
        <p className="text-md font-semibold">Role Permissions</p>

        <div className="flex items-center space-x-2">
          <Switch 
          disabled={true}
          id="allow-manage-order" 
          checked={userRole.canManageOrders || false}
          onCheckedChange={()=>{}}/>
          <Label htmlFor="allow-manage-order">Manage Orders</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
          disabled={true}
          id="allow-manage-products" 
          checked={userRole.canManageProducts || false}
          onCheckedChange={()=>{}}/>
          <Label htmlFor="allow-manage-products">Manage Products</Label>
        </div>
   

        <div className="flex items-center space-x-2">
          <Switch 
          disabled={true}
          id="allow-manage-categories" 
          checked={userRole.canManageCategories || false}
          onCheckedChange={()=>{}}/>
          <Label htmlFor="allow-manage-categories">Manage Categories</Label>
        </div>
       
        <div className="flex items-center space-x-2">
          <Switch 
          disabled={true}
          id="allow-view-sales-and-analytics" 
          checked={userRole.canViewSalesAndAnalytics || false}
          onCheckedChange={()=>{}}/>
          <Label htmlFor="allow-view-sales-and-analytics">View Sales & Analytics</Label>
        </div>

        <div className='flex flex-col justify-center p-4 border-2 border-blue-500 text-blue-700 bg-blue-200'>
          <p className='text-sm font-semibold'>Full Access for Guests</p>
          <p className='text-xs text-justify'>You have full access to explore the store, dashboard, and management pages. Any changes to your permissions will not affect your exploration rights.</p>
        </div>
      </div>

      <hr className='bg-zinc-500 h-px'/>

      <div className='flex flex-row w-full gap-2 items-center'>
        <div className='flex-grow'/>
        <Button 
        variant='subtle'  
        className='text-xs'
        onClick={()=>router.back()}
        disabled={isUpdatingUserRole}>
          Cancel
        </Button>
        <Button 
        variant='secondary' 
        onClick={handleUpdateRole}
        className='text-xs' 
        disabled={isUpdatingUserRole} 
        isLoading={isUpdatingUserRole}>
          Save
        </Button>
      </div>

    </div>
  )
}

export default UserProfile