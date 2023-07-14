import VariantCreate from '@/components/admin/variant/VariantCreate'
import checkAuthorization from '@/lib/authorizer'

const page = async () => {

  await checkAuthorization()
  
  return <VariantCreate/>
}

export default page