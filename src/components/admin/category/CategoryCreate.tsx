'use client'

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CreateCategoryPayload } from "@/lib/validators/category";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

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
          return toast({
            title: 'Category already exists',
            description: 'Please choose a different category name.',
            variant: 'destructive'
          })
        }

        if(err.response?.status === 422){
          return toast({
            title: 'Invalid category name',
            description: err.response.data[0].message || 'Please choose a different category name.',
            variant: 'destructive'
          })
        }

        if(err.response?.status === 401){
          return loginToast()
        }
      }

      toast({
        title: 'There was an error.',
        description: 'Could not create category.',
        variant: 'destructive'
      })
    },

    onSuccess: () => {
      router.back()
      router.refresh()
    }

  })


  return(
    <div className='flex items-center h-full max-w-3xl min-w-[100px]'>
      <div className='relative bg-white w-full h-fit rounded-lg space-y-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Category</h1>
        </div>

        <hr className='bg-zinc-500 h-px'/>

        <div>
          <p className="text-lg font-medium">Category Name</p>
          <p className="text-xs text-gray-500">{`You can change this later`}</p>
        </div>

        <Input 
        value={input}
        onChange={(e)=>{ setInput(e.target.value) }}
        className='border border-slate-700'/>

        <div className="flex justify-center md:justify-end gap-4 ">
          <Button variant='subtle' onClick={()=>router.back()}>Cancel</Button>
          <Button 
          type='submit'
          isLoading={isLoading} 
          disabled={input.length === 0}
          onClick={()=>createCategory()}>
            Create
          </Button>
        </div>

      </div>
    </div>
  )
}

export default CreateCategory