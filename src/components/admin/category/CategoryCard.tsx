import { FC } from 'react'
import Link from 'next/link'
import { Category } from '@prisma/client'
import { buttonVariants } from '../../ui/Button'

interface Props {
  category: Category
}

const CategoryCard: FC<Props> = ({category}) => {
  return(
    
    <Link 
    href={`/dashboard/view-a-category/${category.name}`} 
    className={buttonVariants({className:'text-center p-2 border border-slate-800 rounded-md'})}>
      {category.name}
    </Link>
  )
}

export default CategoryCard