import VariantEdit from "@/components/admin/variant/VariantEdit"
import isLoggedIn from "@/lib/authorization/isLoggedIn"

interface Props {
  params: {
    variantId: string
  }
}

const page = async ({params: { variantId}}: Props) => {

  await isLoggedIn()
  
  return(
    <VariantEdit variantId={variantId}/> 
  )
}

export default page