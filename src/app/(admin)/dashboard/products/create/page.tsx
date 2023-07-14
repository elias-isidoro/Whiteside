import CreateProduct from "@/components/admin/product/ProductCreate"
import checkAuthorization from "@/lib/authorizer"


const Page = async () => {

  await checkAuthorization()

  return (
    <CreateProduct/>
  )
}

export default Page