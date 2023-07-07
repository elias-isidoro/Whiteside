import { Variant } from '@/hooks/use-unsaved-product-store'
import { FC } from 'react'

interface Props {
  variant: Variant
}

const VariantCard: FC<Props> = ({variant}) => {

  return(
    <div className={'relative aspect-square flex flex-row justify-center items-center h-[80px]'}>
      <img src={URL.createObjectURL(variant.image)} alt={'variant preview'} className='absolute inset-0 object-cover w-full h-full rounded-md'/>
    </div>
  )
}

export default VariantCard