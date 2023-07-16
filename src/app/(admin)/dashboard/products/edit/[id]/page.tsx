import ProductEdit from '@/components/admin/product/ProductEdit'
import checkAuthorization from '@/lib/authorizer'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await checkAuthorization()

  return (
    <ProductEdit productId={id}/>
  )
}

export default page