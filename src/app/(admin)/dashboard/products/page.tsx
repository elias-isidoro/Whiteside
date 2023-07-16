import DashNav from "@/components/admin/navbar/DashNav";
import ProductShowcase from "@/components/admin/product/ProductShowcase";
import checkAuthorization from "@/lib/authorizer";

const page  = async () => {

  await checkAuthorization()
  
  return(
    <div className="w-full pb-12">
      <DashNav focus={'Products'}/>
      <ProductShowcase/>
    </div>
  )
}

export default page