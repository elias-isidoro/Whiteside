import CreateProduct from "@/components/admin/product/ProductCreate"
import isLoggedIn from "@/lib/authorization/isLoggedIn"


const Page = async () => {

  await isLoggedIn()

  return (
    <CreateProduct/>
  )
}

export default Page