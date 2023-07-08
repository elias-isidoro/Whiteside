'use client'

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CreateCategoryPayload } from "@/lib/validators/category";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils";
import { Pencil } from "lucide-react";

const CreateCategory = () => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const {loginToast} = useCustomToast();

  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateCategoryPayload = {
        name: input
      }
      const {data} = await axios.post('/api/category', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 409){
          return toastError('Category already exists',  'Please choose a different category name.')
        }

        if(err.response?.status === 422){
          return toastError('Invalid category name',err.response.data[0].message || 'Please choose a different category name.')
        }

        if(err.response?.status === 401){
          return loginToast()
        }
      }

      toastError('There was an error.', 'Could not create category.')
    },

    onSuccess: () => {
      router.back()
      router.refresh()
      toastDefault('Cheers', 'A new category has been successfully created')
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
        onClick={()=>createCategory()}
        className="text-sm">
          Create
        </Button>
      </div>
    </div>
  )
}

export default CreateCategory