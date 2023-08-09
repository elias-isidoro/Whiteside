'use client'

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Loading from "@/components/ui/Loading";
import { Switch } from "@/components/ui/Switch";
import { UpdateRolePayload } from "@/lib/validators/role";
import useUpdateRole from "@/queries/role/uesUpdateRole";
import useDeleteRole from "@/queries/role/useDeleteRole";
import useFetchAllRoles from "@/queries/role/useFetchAllRoles";
import useFetchRole from "@/queries/role/useFetchRole";
import { Pencil, Trash2 } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  roleId: string
}

const RoleEdit = ({roleId}: Props) => {

  const router = useRouter()
  const [roleName, setRoleName] = useState('')
  const {refetch: refetchRoles} = useFetchAllRoles()

  const {data: role, isLoading: isFetchingRole, refetch: refetchRole} = useFetchRole({roleId})

  const [canManageOrders, setCanManageOrders] = useState(false)
  const [canManageProducts, setCanManageProducts] = useState(false)
  const [canManageCategories, setCanManageCategories] = useState(false)
  const [canViewSalesAndAnalytics, setCanViewSalesAndAnalytics] = useState(false)

  const {mutate: deleteRole, isLoading: isDeletingRole} = useDeleteRole({
    onSuccessCallback: () => {
      router.back()
      refetchRoles()
    }
  })

  const { mutate: updateRole, isLoading: isUpdatingRole } = useUpdateRole({
    onSuccessCallback: () => {
      router.back()
      refetchRole()
      refetchRoles()
    }
  })

  const handleDelete = () => deleteRole({id: roleId})

  const handleSubmit = () => {
    const payload: UpdateRolePayload = {
      id: roleId,
      name: roleName,
      canManageOrders,
      canManageProducts,
      canManageCategories,
      canViewSalesAndAnalytics,
    }
    updateRole(payload)
  }

  useEffect(()=>{
    if(!role) return
    const { 
      name,
      canManageOrders,
      canManageProducts,
      canManageCategories,
      canViewSalesAndAnalytics
    } = role

    setRoleName(name)
    setCanManageOrders(canManageOrders)
    setCanManageProducts(canManageProducts)
    setCanManageCategories(canManageCategories)
    setCanViewSalesAndAnalytics(canViewSalesAndAnalytics)

  },[role])

  if(isFetchingRole){
    return <Loading/>
  }

  if(!role){
    return notFound()
  }

  return(
    <div className='flex flex-col w-full max-w-xs gap-5 px-4'>
      <div className='flex flex-row gap-2 items-center '>
        <Pencil/>
        <p className='text-lg font-semibold'>Edit a Role</p>
      </div>
      <hr className='bg-zinc-500 h-px'/>

      <div className='flex flex-col w-full gap-2'>
        <p className="text-lg font-semibold">Name</p>
        <Input 
        disabled={isDeletingRole || isUpdatingRole}
        value={roleName}
        onChange={(e)=>{ setRoleName(e.target.value) }}
        className='border border-slate-700'/>
      </div>

      <div className='flex flex-col w-full gap-2'>
        <p className="text-lg font-semibold">Permissions</p>

        <div className="flex items-center space-x-2">
          <Switch 
          disabled={isDeletingRole || isUpdatingRole}
          id="allow-manage-order" 
          checked={canManageOrders}
          onCheckedChange={()=>setCanManageOrders(current=>!current)}/>
          <Label htmlFor="allow-manage-order">Manage Orders</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
          disabled={isDeletingRole || isUpdatingRole}
          id="allow-manage-products" 
          checked={canManageProducts}
          onCheckedChange={()=>setCanManageProducts(current=>!current)}/>
          <Label htmlFor="allow-manage-products">Manage Products</Label>
        </div>
   

        <div className="flex items-center space-x-2">
          <Switch 
          disabled={isDeletingRole || isUpdatingRole}
          id="allow-manage-categories" 
          value={1}
          checked={canManageCategories}
          onClick={()=>setCanManageCategories(current=>!current)}/>
          <Label htmlFor="allow-manage-categories">Manage Categories</Label>
        </div>
       
        <div className="flex items-center space-x-2">
          <Switch 
          disabled={isDeletingRole || isUpdatingRole}
          id="allow-view-sales-and-analytics" 
          checked={canViewSalesAndAnalytics}
          onCheckedChange={()=>setCanViewSalesAndAnalytics(current=>!current)}/>
          <Label htmlFor="allow-view-sales-and-analytics">View Sales & Analytics</Label>
        </div>
        
      </div>
   
      
      <hr className='bg-zinc-500 h-px'/>

      <div className="flex justify-center md:justify-end gap-2">
        <Button 
        variant={'ghost'} 
        onClick={handleDelete} 
        disabled={isDeletingRole || isUpdatingRole}
        isLoading={isDeletingRole}>
          {!isDeletingRole&&<Trash2 color='red' className='h-5 w-5 sm:h-6 sm:w-6'/>}
        </Button>

        <div className="flex-grow"/>
        <Button 
        variant='subtle' 
        className="text-xs"
        onClick={()=>router.back()} 
        disabled={isDeletingRole || isUpdatingRole}>
          Cancel
        </Button>
        
        <Button 
        type='submit'
        variant={'secondary'}
        isLoading={isUpdatingRole} 
        disabled={roleName.length === 0 || isUpdatingRole || isDeletingRole}
        onClick={handleSubmit}
        className="text-xs">
          Update
        </Button>
      </div>
    </div>
  )
}

export default RoleEdit