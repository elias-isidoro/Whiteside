import CreateCategory from '@/components/admin/category/CategoryCreate'
import CrudModal from '@/layouts/CrudModal'
import checkAuthorization from '@/lib/authorizer'

const page = async () => {

  await checkAuthorization()

  return(
    <CrudModal>
      <CreateCategory/>
    </CrudModal>
  )
}

export default page