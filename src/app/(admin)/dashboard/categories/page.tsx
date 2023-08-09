import CategoryShowcase from "@/components/admin/category/CategoryShowcase";
import DashNav from "@/components/admin/navbar/DashNav";
import isLoggedIn from "@/lib/authorization/isLoggedIn";

const page  = async () => {

  await isLoggedIn()
  
  return(
    <>
    <DashNav focus={'Categories'}/>
    <CategoryShowcase/>
    </>
  )
}

export default page