import DashNav from "@/components/admin/navbar/DashNav";
import SalesReport from "@/components/admin/sales/SalesReport";
import checkAuthorization from "@/lib/authorizer";

const page  = async () => {

  await checkAuthorization()
  
  return(
    <div className="w-full pb-12">
      <DashNav focus={'Sales'}/>
      <SalesReport/>
    </div>
  )
}

export default page