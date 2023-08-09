import DashNav from "@/components/admin/navbar/DashNav";
import ProductShowcase from "@/components/admin/product/ProductShowcase";
import isLoggedIn from "@/lib/authorization/isLoggedIn";

const page  = async () => {

  await isLoggedIn()
  
  return(
    <div className="w-full pb-12">
      <DashNav focus={'Products'}/>
      <ProductShowcase/>
    </div>
  )
}

export default page