import Cart from '@/components/customer/cart/Cart'
import isLoggedIn from '@/lib/authorization/isLoggedIn'


const page = async () => {

  const user = await isLoggedIn()
  
  return <Cart user={user}/>
}

export default page