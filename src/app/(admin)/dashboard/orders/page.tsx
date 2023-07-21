import DashNav from "@/components/admin/navbar/DashNav";
import OrdersShowcase from "@/components/admin/orders/OrdersShowcase";
import checkAuthorization from "@/lib/authorizer";

const page  = async () => {

  await checkAuthorization()
  
  return(
    <div className="w-full pb-12">
      <DashNav focus={'Orders'}/>
      <OrdersShowcase/>
    </div>
  )
}

export default page