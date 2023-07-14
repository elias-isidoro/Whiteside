import ProductView from '@/components/admin/product/ProductView'
import checkAuthorization from '@/lib/authorizer'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await checkAuthorization()

  return (
    <ProductView productId={id}/>
  )
}

export default page