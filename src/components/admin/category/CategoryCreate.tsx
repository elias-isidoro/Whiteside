'use client'

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import useCreateCategory from "@/queries/categories/useCreateCategory";
import useFetchAllCategories from "@/queries/categories/useFetchAllCategories";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateCategory = () => {
  const router = useRouter()
  const [input, setInput] = useState('')
  const {refetch: refetchCategories} = useFetchAllCategories()

  const { mutate: createCategory, isLoading } = useCreateCategory({
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
        <Button variant='subtle' onClick={()=>router.back()} className="text-sm">Cancel</Button>
        <Button 
        type='submit'
        isLoading={isLoading} 
        disabled={input.length === 0}
        onClick={()=>createCategory(input)}
        className="text-sm">
          Create
        </Button>
      </div>
    </div>
  )
}

export default CreateCategory