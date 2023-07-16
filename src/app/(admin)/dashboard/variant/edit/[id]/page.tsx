import VariantEdit from "@/components/admin/variant/VariantEdit"
import checkAuthorization from "@/lib/authorizer"

interface Props {
  params: {
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await checkAuthorization()
  
  return(
    <VariantEdit variantId={id}/> 
  )
}

export default page