'use client'

import { cn } from '@/lib/utils'
import { Category } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'
import { buttonVariants } from '../../ui/Button'

interface Props {
  category: Category
}

const CategoryCard: FC<Props> = ({category}) => {

  return(
    <tr className='h-[50px]'>
      <td className='relative h-full border border-black'>
        <div className='absolute inset-0 flex'>
          <p className='text-sm overflow-hidden px-4 whitespace-nowrap text-ellipsis my-auto'>
            {category.name}
          </p>
        </div>  
      </td>
      <td className='hidden h-full text-center border border-black min-[455px]:table-cell'>Products Count</td>
      <td className='h-full text-center border border-black'>
        <Link href={`/dashboard/categories/edit/${category.id}`} className={cn(buttonVariants(),'py-1 text-xs')}>
          Edit
        </Link>
      </td>
    </tr>
  )
}

export default CategoryCard