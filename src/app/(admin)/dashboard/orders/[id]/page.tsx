import OrderView from "@/components/admin/orders/OrderView";
import checkAuthorization from "@/lib/authorizer";

interface Props {
  params: { 
    id: string
  }
}

const page  = async ({params:{id}}: Props) => {

  await checkAuthorization()
  
  return(
    <OrderView orderId={id}/>
  )
}

export default page