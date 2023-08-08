'use client'

import UserAvatar from '@/components/user/UserAvatar'
import { ComboBox } from '@/components/ui/ComboBox'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import useFetchAllRoles from '@/queries/role/useFetchAllRoles'
import useFetchAllUsers from '@/queries/user/useFetchAllUsers'
import useFetchUser from '@/queries/user/useFetchUser'
import useUpdateUserRole from '@/queries/user/useUpdateUserRole'
import { Edit2 } from 'lucide-react'
import { notFound, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { Button } from '../../ui/Button'

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

const UserManage: FC<Props> = ({userId}) => {

  const router = useRouter();
  const {data: user, isLoading: isFetchingUser, refetch: refetchUser} = useFetchUser({userId})
  const {data: users, isLoading: isFetchingAllUsers, refetch: refetchAllUsers} = useFetchAllUsers()
  const {data: roles, isLoading: isFetchingAllRoles} = useFetchAllRoles()
  
  const [userRole, setUserRole] = useState<RoleValue>(user ? user.Role : NO_ROLE_VALUE)

  const {mutate: updateUserRole, isLoading: isUpdatingUserRole} = useUpdateUserRole({
    onSuccessCallback: () => {
      router.back()
      refetchUser()
      refetchAllUsers()
    }
  })
  
  useEffect(()=>{
    if(!user || !user.Role) return
    setUserRole(user.Role)
  },[user])
  
  const handleRoleChange = (roleId: string) => {
    if(!roles) return
    const role = roles.find((role)=>role.id==roleId)
    setUserRole(()=>{
      if(role && role.id!==userRole.id) return role
      return NO_ROLE_VALUE
    })
  }

  if(isFetchingUser || isFetchingAllUsers || isFetchingAllRoles) return <>Loading...</>
  if(!user || !users || !roles) return notFound()

  const handleUpdateRole = () => updateUserRole({id: userId, roleId: userRole.id})

  return(
    <div className='flex flex-col w-full gap-5 p-2 pb-0 max-w-sm'>
      <div className='flex flex-row gap-2 items-center '>
        <Edit2/>
        <p className='text-lg font-semibold'>Manage a User</p>
      </div>

      <hr className='bg-zinc-500 h-px'/>

      <div className='flex flex-col w-full items-center justify-center'>
        <UserAvatar 
          id={`${user.id}_avatar`}
          className='h-16 w-16 border border-black'
          user={{
            name: user.username || user.name || 'No name',
            image: user.image || null,
          }}/>
        <Label 
        htmlFor={`${user.id}_avatar`} 
        className='p-2 text-md font-medium'>
          {user.username || user.name || 'No name'}
        </Label>

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
        <p className="text-md font-semibold">Permissions</p>

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

export default UserManage