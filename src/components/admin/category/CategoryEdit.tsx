'use client'

import { Input } from '@/components/ui/Input'
import { useCategorizerStore } from '@/stores/use-categorizer-store'
import { cn } from '@/lib/utils'
import useDeleteCategory from '@/queries/categories/useDeleteCategory'
import useFetchCategory from '@/queries/categories/useFetchCategory'
import useUpdateCategory from '@/queries/categories/useUpdateCategory'
import useFetchProductsUnder from '@/queries/categorizer/useFetchProductsUnder'
import useUncategorizeProducts from '@/queries/categorizer/useUncategorizeProducts'
import { Edit2, MinusCircle, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
import { Button, buttonVariants, } from '../../ui/Button'
import CategorizerCard from './CategorizerCard'
import useFetchAllCategoriesWithProducts from '@/queries/categories/useFetchAllCategoriesWithProducts'

interface Props {
  categoryId: string
}

const CategoryEdit: FC<Props> = ({categoryId}) => {

  const router = useRouter();
  const [categoryName, setCategoryName] = useState('')
  const {data: category, isLoading: isFetchingCategory, refetch: refetchCategory} = useFetchCategory({categoryId})

  const {resetAllStates, selectedProducts} = useCategorizerStore()

  const {refetch: refetchAllCategories} = useFetchAllCategoriesWithProducts()
  
  const { data: products, isLoading: isFetchingProducts, refetch: refetchProducts } = useFetchProductsUnder({categoryId})

  const {mutate: uncategorizeProducts, isLoading: isUncategorizing} = useUncategorizeProducts({
    onSuccessCallback: () => {
      resetAllStates()
      refetchProducts()
      refetchAllCategories()
    }
  })

  const {mutate: updateCategory, isLoading: isUpdatingCategory} = useUpdateCategory({
    onSuccessCallback: () => {
      router.back()
      refetchCategory()
      refetchAllCategories()
    }
  })

  const {mutate: deleteCategory, isLoading: isDeletingCategory} = useDeleteCategory({
    onSuccessCallback: () => {
      router.back()
      refetchAllCategories()
    }
  })
  
  const invisibleChildren = useMemo(() => Array.from({length:4},(_, i) => <CategorizerCard key={`invisible_${i}`} isInvisible={true}/>), []);

  useEffect(()=>resetAllStates,[resetAllStates])
  useEffect(()=>category&&setCategoryName(category.name),[category])


  if(isFetchingCategory || isFetchingProducts) return <>Loading...</>
  if(!category || !products) return notFound()

  const handleDelete = () => deleteCategory({id: category.id})
  const handleRemove = () => uncategorizeProducts({ selectedProducts })
  const handleSave = () => updateCategory({name: categoryName, id: category.id})


  return(
    <div className='flex flex-col w-full gap-5 p-2 pb-0'>
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
        className='border border-slate-700 rounded-none'/>
      </div>

      <div className=''>
        <p className='text-lg font-semibold'>Products</p>
      </div>

      <div className='flex flex-col w-full gap-2'>
        {selectedProducts.length===0?
          <Link href={`/dashboard/categories/edit/${category.id}/categorizer`} className={cn(buttonVariants(),'w-fit pl-2 gap-1')}>
            <Plus className='h-5 w-5'/>
            <p className='text-xs'>Add products</p>
          </Link>
        :
          <Button onClick={handleRemove} variant={'destructive'} className={'w-fit pl-2 gap-1'} isLoading={isUncategorizing}>
            {!isUncategorizing&&<MinusCircle className='h-5 w-5'/>}
            <p className='text-xs'>Remove selected</p>
          </Button>
        }
        
          <div className='flex flex-row flex-wrap w-full max-h-[450px] gap-2 overflow-auto py-1'>
            {products.length===0?
            <p className='w-full text-center border border-black py-2 px-4 text-sm'>
              There are currently no products under this category...
            </p>
            :
            <>{products.map((product)=>(<CategorizerCard key={`edit_${category.id}_${product.id}`} product={product}/>))}
            {invisibleChildren}</>
            }
          </div>

      </div>

      <hr className='bg-zinc-500 h-px'/>

      <div className='flex flex-row w-full gap-2 items-center'>
        <Button 
        variant={'ghost'} 
        onClick={handleDelete} 
        isLoading={isDeletingCategory}>
          {!isDeletingCategory&&<Trash2 color='red' className='h-5 w-5 sm:h-6 sm:w-6'/>}
        </Button>
        <div className='flex-grow'/>
        <Button 
        variant='subtle'  
        className='text-xs'
        onClick={()=>router.back()}
        disabled={isDeletingCategory || isUpdatingCategory}>
          Cancel
        </Button>
        <Button 
        variant='secondary' 
        onClick={handleSave}
        className='text-xs' 
        disabled={isUpdatingCategory} 
        isLoading={isUpdatingCategory}>
          {(categoryName === category.name)?'Done':'Save'}
        </Button>
      </div>

    </div>
  )
}

export default CategoryEdit