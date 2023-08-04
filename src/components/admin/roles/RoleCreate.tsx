'use client'

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { CreateRolePayload } from "@/lib/validators/role";
import useCreateRole from "@/queries/role/useCreateRole";
import useFetchAllRoles from "@/queries/role/useFetchAllRoles";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RoleCreate = () => {
  const router = useRouter()
  const [roleName, setRoleName] = useState('')
  const {refetch: refetchRoles} = useFetchAllRoles()

  const [canManageOrders, setCanManageOrders] = useState(false)
  const [canManageProducts, setCanManageProducts] = useState(false)
  const [canManageCategories, setCanManageCategories] = useState(false)
  const [canViewSalesAndAnalytics, setCanViewSalesAndAnalytics] = useState(false)

  const { mutate: createRole, isLoading: isCreatingRole } = useCreateRole({
    onSuccessCallback: () => {
      router.back()
      refetchRoles()
    }
  })

  const handleSubmit = () => {
    const payload: CreateRolePayload = {
      name: roleName,
      canManageOrders,
      canManageProducts,
      canManageCategories,
      canViewSalesAndAnalytics,
    }
    createRole(payload)
  }

  return(
    <div className='flex flex-col w-full max-w-xs gap-5 px-4'>
      <div className='flex flex-row gap-2 items-center '>
        <Pencil/>
        <p className='text-lg font-semibold'>Create a Role</p>
      </div>
      <hr className='bg-zinc-500 h-px'/>

      <div className='flex flex-col w-full gap-2'>
        <p className="text-lg font-semibold">Name</p>
        <Input 
        disabled={isCreatingRole}
        value={roleName}
        onChange={(e)=>{ setRoleName(e.target.value) }}
        className='border border-slate-700'/>
      </div>

      <div className='flex flex-col w-full gap-2'>
        <p className="text-lg font-semibold">Permissions</p>

        <div className="flex items-center space-x-2">
          <Switch 
          disabled={isCreatingRole}
          id="allow-manage-order" 
          onClick={()=>setCanManageOrders(current=>!current)}/>
          <Label htmlFor="allow-manage-order">Manage Orders</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
          disabled={isCreatingRole}
          id="allow-manage-products" 
          onClick={()=>setCanManageProducts(current=>!current)}/>
          <Label htmlFor="allow-manage-products">Manage Products</Label>
        </div>
   

        <div className="flex items-center space-x-2">
          <Switch 
          disabled={isCreatingRole}
          id="allow-manage-categories" 
          onClick={()=>setCanManageCategories(current=>!current)}/>
          <Label htmlFor="allow-manage-categories">Manage Categories</Label>
        </div>
       
        <div className="flex items-center space-x-2">
          <Switch 
          disabled={isCreatingRole}
          id="allow-view-sales-and-analytics" 
          onClick={()=>setCanViewSalesAndAnalytics(current=>!current)}/>
          <Label htmlFor="allow-view-sales-and-analytics">View Sales & Analytics</Label>
        </div>
        
      </div>
   
      
      <hr className='bg-zinc-500 h-px'/>

      <div className="flex justify-center md:justify-end gap-2">
        <div className="flex-grow"/>
        <Button 
        variant='subtle' 
        className="text-xs"
        onClick={()=>router.back()} 
        disabled={isCreatingRole}>
          Cancel
        </Button>
        
        <Button 
        type='submit'
        isLoading={isCreatingRole} 
        disabled={roleName.length === 0 || isCreatingRole}
        onClick={handleSubmit}
        className="text-xs">
          Create
        </Button>
      </div>
    </div>
  )
}

export default RoleCreate