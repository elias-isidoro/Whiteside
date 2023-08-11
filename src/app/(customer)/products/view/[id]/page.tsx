import ProductView from '@/components/customer/product/ProductView'
import { getAuthSession } from '@/lib/auth'

interface Props {
  params: {
    id: string
  }
}

const page = async ({params: {id}}: Props) => {
  
  const session = await getAuthSession()

  return(
    <ProductView productVariantId={id} session={session}/>
  )
}

export default page