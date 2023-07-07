import { buttonVariants } from '@/components/ui/Button'
import { useUnsavedProductStore } from '@/hooks/use-unsaved-product-store'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import VariantCard from './VariantCard'

const VariantShowcase = () => {
  
  const {unsavedVariants} = useUnsavedProductStore()

  return(
    <div className='flex flex-row flex-wrap w-full gap-2'>
      <Link href={`/dashboard/create-a-variant`} className={buttonVariants({className:'aspect-square flex flex-row justify-center items-center h-[80px] p-2'})}>
        <Plus className='h-full w-full'/>
      </Link>

      {unsavedVariants.map((variant,i)=>(
        <VariantCard key={i} variant={variant}/>
      ))}
    </div>
  )
}

export default VariantShowcase