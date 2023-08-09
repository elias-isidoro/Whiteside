import DashNav from "@/components/admin/navbar/DashNav";
import SalesReport from "@/components/admin/sales/SalesReport";
import isLoggedIn from "@/lib/authorization/isLoggedIn";

const page  = async () => {

  await isLoggedIn()
  
  return(
    <div className="w-full pb-12">
      <DashNav focus={'Sales'}/>
      <SalesReport/>
    </div>
  )
}

export default page