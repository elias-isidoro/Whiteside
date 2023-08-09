import VariantCreate from '@/components/admin/variant/VariantCreate'
import isLoggedIn from '@/lib/authorization/isLoggedIn'

const page = async () => {

  await isLoggedIn()
  
  return <VariantCreate/>
}

export default page