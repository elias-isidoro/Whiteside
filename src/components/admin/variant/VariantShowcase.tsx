import { buttonVariants } from '@/components/ui/Button'
import { Variant } from '@/hooks/use-unsaved-product-store'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import VariantCard from './VariantCard'

interface Props {
  productId?: string
  variants: Variant[]
}

const VariantShowcase = ({productId, variants}:Props) => {
  

  return(
    <div className='flex flex-row flex-wrap w-full gap-2'>
      <Link href={!productId?`/dashboard/variants/create`:`/dashboard/products/edit/${productId}/create-variant`} className={buttonVariants({className:'aspect-square flex flex-row justify-center items-center h-[80px] p-2'})}>
        <Plus className='h-full w-full'/>
      </Link>

      {variants.map((variant,i)=>(
        <VariantCard key={i} productId={productId} variant={variant}/>
      ))}
    </div>
  )
}

export default VariantShowcase