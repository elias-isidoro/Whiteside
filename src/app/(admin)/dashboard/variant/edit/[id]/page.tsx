import VariantEdit from "@/components/admin/variant/VariantEdit"
import isLoggedIn from "@/lib/authorization/isLoggedIn"

interface Props {
  params: {
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await isLoggedIn()
  
  return(
    <VariantEdit variantId={id}/> 
  )
}

export default page