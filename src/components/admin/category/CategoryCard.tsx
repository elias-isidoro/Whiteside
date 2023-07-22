'use client'

import { Button, buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import useDeleteCategory from '@/queries/categories/useDeleteCategory'
import { Category, Product } from '@prisma/client'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  category: (Category & {
      products: Product[];
  })
  onDelete: ()=> void
}

const CategoryCard: FC<Props> = ({category,onDelete}) => {


  const {mutate: deleteCategory, isLoading: isDeletingCategory} = useDeleteCategory({
    onSuccessCallback: () => {
      onDelete()
    }
  })

  const handleDelete = () => deleteCategory({id: category.id})

  return(
    <tr className='group h-[50px]'>
      <td className='relative h-full border-b border-gray-300'>
        <div className='absolute inset-0 flex'>
          <Link 
          key={`clickedit_${category.id}${category.name}`} 
          href={`/dashboard/categories/edit/${category.id}`}
          className='text-xs overflow-hidden px-4 whitespace-nowrap text-ellipsis my-auto group-hover:underline'>
            {category.name}
          </Link>
        </div>  
      </td>
      <td className='h-full text-xs text-center border-b border-gray-300'>{category.products.length}</td>
      <td className='h-full text-center border-b border-gray-300'>
        <div className={'h-full w-full flex justify-center items-center gap-3 p-2'}>
          <Link 
          key={`edit_${category.id}${category.name}`} 
          href={`/dashboard/categories/edit/${category.id}`}
          className={cn(buttonVariants({variant:'ghost'}),'p-1 h-auto w-auto')}>
            <Pencil color={'blue'} strokeWidth={'1.5px'}/>
          </Link>
          <Button 
          isLoading={isDeletingCategory}
          onClick={handleDelete}
          variant={'ghost'} 
          className='p-1 h-auto w-auto'>
            {!isDeletingCategory&&<Trash2 color={'red'} strokeWidth={'1.5px'}/>}
          </Button>
        </div>
      </td>
    </tr>
  )
}

export default CategoryCard