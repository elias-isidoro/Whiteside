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
    <ProductView productId={id} session={session}/>
  )
}

export default page