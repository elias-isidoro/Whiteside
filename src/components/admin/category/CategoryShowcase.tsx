'use client'

import { Plus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import CategoryCard from './CategoryCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import useFetchAllCategoriesWithProducts from '@/queries/categories/useFetchAllCategoriesWithProducts';
import notFound from '@/app/not-found';

const CategoryShowcase = () => {

  const {data: categories, isLoading: isFetchingCategories} = useFetchAllCategoriesWithProducts()

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

        <span className='h-[1px] bg-gray-300'/>

        <div className='w-full text-sm'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='h-[35px]'>
                <td width={'50%'} className='h-full font-semibold text-center border border-black'>Name</td>
                <td width={'30%'} className='hidden h-full font-semibold text-center border border-black min-[455px]:table-cell'>Product Count</td>
                <td width={'20%'} className='h-full font-semibold text-center border border-black'>Action</td>
              </tr>
            </thead>
            <tbody>
              {categories.map((category)=>(<CategoryCard key={`${category.id}${category.name}`} category={category}/>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CategoryShowcase