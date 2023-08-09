import ProductEdit from '@/components/admin/product/ProductEdit'
import isLoggedIn from '@/lib/authorization/isLoggedIn'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await isLoggedIn()

  return (
    <ProductEdit productId={id} userId={id}/>
  )
}

export default page