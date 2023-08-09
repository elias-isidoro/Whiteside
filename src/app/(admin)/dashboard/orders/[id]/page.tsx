import OrderView from "@/components/admin/orders/OrderView";
import isLoggedIn from "@/lib/authorization/isLoggedIn";

interface Props {
  params: { 
    id: string
  }
}

const page  = async ({params:{id}}: Props) => {

  await isLoggedIn()
  
  return(
    <OrderView orderId={id}/>
  )
}

export default page