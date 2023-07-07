import type { Category, Product, Variant } from '@prisma/client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { buttonVariants } from '@/components/ui/Button';
import ProductCard from '../product/ProductCard';

interface Props {
  category: Category & {
    products: (Product & {
      variants: Variant[]
    })[];
}
}

const CategoryShowcase: FC<Props> = ({category}) => {

  const invisibleChildren = useMemo(() => Array.from({length:5},(_, i) => <ProductCard key={`invisible_${i}`} isInvisible={true}/>), []);
    
  if(!category) return null

  return(
    <div className='flex flex-wrap h-full w-full py-4 gap-2'>

      <Link 
      href={`/dashboard/categorize-a-product/${category.name}`} 
      className={buttonVariants({
        className:`relative aspect-square flex flex-grow basis-1/3 min-[500px]:basis-1/4 min-[750px]:basis-1/5 justify-center items-center h-full rounded-md`
      })}>
        <Plus className='p-0'/>
      </Link>

      {category.products.map((product)=>{
        return (<ProductCard key={`product_${product.id}`} product={product}/>)
      })}

      {invisibleChildren}
    </div>
  )
}

export default CategoryShowcase