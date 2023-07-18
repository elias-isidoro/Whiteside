'use client'

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import useCreateCategory from "@/queries/categories/useCreateCategory";
import useFetchAllCategoriesWithProducts from "@/queries/categories/useFetchAllCategoriesWithProducts";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateCategory = () => {
  const router = useRouter()
  const [input, setInput] = useState('')
  const {refetch: refetchCategories} = useFetchAllCategoriesWithProducts()

  const { mutate: createCategory, isLoading: isCreatingCategory } = useCreateCategory({
    onSuccessCallback: () => {
      router.back()
      refetchCategories()
    }
  })

  return(
    <div className='flex flex-col w-full max-w-md gap-5'>
      <div className='flex flex-row gap-2 items-center '>
        <Pencil/>
        <p className='text-lg font-semibold'>Create a Category</p>
      </div>
      <hr className='bg-zinc-500 h-px'/>

      <div className='flex flex-col w-full'>
        <p className="text-lg font-semibold">Name</p>
        <p className="text-xs text-gray-500">{`You can change this later`}</p>
      </div>

      <Input 
      value={input}
      onChange={(e)=>{ setInput(e.target.value) }}
      className='border border-slate-700'/>

      <hr className='bg-zinc-500 h-px'/>

      <div className="flex justify-center md:justify-end gap-2">
        <Button 
        variant='subtle' 
        className="text-sm"
        onClick={()=>router.back()} 
        disabled={isCreatingCategory}>
          Cancel
        </Button>
        
        <Button 
        type='submit'
        isLoading={isCreatingCategory} 
        disabled={input.length === 0 || isCreatingCategory}
        onClick={()=>createCategory({name:input})}
        className="text-sm">
          Create
        </Button>
      </div>
    </div>
  )
}

export default CreateCategory