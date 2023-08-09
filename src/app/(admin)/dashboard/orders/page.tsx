import DashNav from "@/components/admin/navbar/DashNav";
import OrdersShowcase from "@/components/admin/orders/OrdersShowcase";
import isLoggedIn from "@/lib/authorization/isLoggedIn";

const page  = async () => {

  await isLoggedIn()
  
  return(
    <div className="w-full pb-12">
      <DashNav focus={'Orders'}/>
      <OrdersShowcase/>
    </div>
  )
}

export default page