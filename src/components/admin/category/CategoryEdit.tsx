'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { FC, useState } from 'react'
import { Category } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button, buttonVariants } from '../../ui/Button'
import useUpdateCategory from '@/queries/categories/useUpdateCategory'
import useDeleteCategory from '@/queries/categories/useDeleteCategory'

interface Props {
  category: Category
}

const CategoryEdit: FC<Props> = ({category}) => {

  const router = useRouter();
  const [categoryName, setCategoryName] = useState(category.name)
  const {mutate: updateCategory, isLoading: isUpdatingCategory} = useUpdateCategory()
  const {mutate: deleteCategory, isLoading: isDeletingCategory} = useDeleteCategory()

  const handleSave = () => updateCategory({name: categoryName, id: category.id})
  const handleDelete = () => deleteCategory({id: category.id})

  return(
    <div className='flex flex-col w-full max-w-md gap-5'>
      <div className='flex flex-row gap-2 items-center '>
        <Edit2/>
        <p className='text-lg font-semibold'>Edit a Category</p>
      </div>

      <hr className='bg-zinc-500 h-px'/>

      <div className='flex flex-col w-full gap-4'>
        <p className='text-lg font-semibold'>Name</p>
        <Input 
        value={categoryName}
        onChange={(e)=>{ setCategoryName(e.target.value) }}
        className='border border-slate-700'/>
      </div>

      <Link href={`/dashboard/categories/edit/${category.id}/products/all`} className={cn(buttonVariants(),'w-full')}>
        {`View Products`}
      </Link>

      <hr className='bg-zinc-500 h-px'/>

      <div className='flex flex-row w-full gap-2 items-center'>

        <Button 
        variant={'ghost'} 
        onClick={handleDelete} 
        isLoading={isDeletingCategory}>
          {!isDeletingCategory&&<Trash2 color='red'/>}
        </Button>

        <div className='flex-grow'/>

        <Button variant='subtle' onClick={()=>router.back()}>Cancel</Button>

        <Button 
        variant='secondary' 
        onClick={handleSave} 
        disabled={isUpdatingCategory || (categoryName === category.name)} 
        isLoading={isUpdatingCategory}>
          Save
        </Button>
      </div>

    </div>
  )
}

export default CategoryEdit