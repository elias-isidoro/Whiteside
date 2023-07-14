import CategoryShowcase from "@/components/admin/category/CategoryShowcase";
import DashNav from "@/components/admin/navbar/DashNav";
import checkAuthorization from "@/lib/authorizer";

const page  = async () => {

  await checkAuthorization()
  
  return(
    <>
    <DashNav focus={'Categories'}/>
    <CategoryShowcase/>
    </>
  )
}

export default page