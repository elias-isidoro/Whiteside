import { Variant } from '@/hooks/use-unsaved-product-store'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  variant: Variant
  productId?: string
}

const VariantCard: FC<Props> = ({variant,productId}) => {

  return(
    <Link href={productId?`/dashboard/products/edit/${productId}/edit-variant/${variant.id}`:`/dashboard/variants/edit/${variant.id}`} className={'relative aspect-square flex flex-row justify-center items-center h-[80px]'}>
      <img src={(variant.image instanceof File) ? URL.createObjectURL(variant.image) : variant.image} alt={'variant preview'} className='absolute inset-0 object-cover w-full h-full rounded-md'/>
    </Link>
  )
}

export default VariantCard