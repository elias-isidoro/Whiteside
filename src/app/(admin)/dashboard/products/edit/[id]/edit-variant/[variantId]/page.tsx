import VariantEdit from "@/components/admin/variant/VariantEdit"
import checkAuthorization from "@/lib/authorizer"

interface Props {
  params: {
    variantId: string
  }
}

const page = async ({params: { variantId}}: Props) => {

  await checkAuthorization()
  
  return(
    <VariantEdit variantId={variantId}/> 
  )
}

export default page