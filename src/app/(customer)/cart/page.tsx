import Cart from '@/components/customer/cart/Cart'
import checkAuthorization from '@/lib/authorizer'


const page = async () => {

  const user = await checkAuthorization()
  
  return <Cart user={user}/>
}

export default page