'use client'

import { Plus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import CategoryCard from './CategoryCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import useFetchAllCategoriesWithProducts from '@/queries/categories/useFetchAllCategoriesWithProducts';
import notFound from '@/app/not-found';

const CategoryShowcase = () => {

  const {data: categories, isLoading: isFetchingCategories, refetch} = useFetchAllCategoriesWithProducts()

  if(isFetchingCategories){
    return <>Loading...</>
  }

  if(!categories){
    return notFound()
  }

  return (
    <div className='w-full pb-12'>
      <div className='flex flex-col w-full py-4 gap-4'>
        <div className='flex flex-row w-full'>
          <Link href={'/dashboard/categories/create'} className={cn(buttonVariants(),'gap-2 pl-2')}>
            <Plus className='h-6 w-6'/>
            <p className='text-xs'>Create new category</p>
          </Link>
        </div>

        <div className='w-full text-sm'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='h-[50px]'>
                <td width={'70%'} className='px-4 h-full text-xs font-semibold border-b border-gray-300'>Name</td>
                <td width={'20%'} className='px-2 h-full text-xs font-semibold text-center border-b border-gray-300'>Products</td>
                <td width={'10%'} className='px-2 h-full text-xs font-semibold text-center border-b border-gray-300'>Action</td>
              </tr>
            </thead>
            <tbody>
              {categories.map((category)=>(<CategoryCard key={`${category.id}${category.name}`} category={category} onDelete={()=>refetch()}/>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CategoryShowcase