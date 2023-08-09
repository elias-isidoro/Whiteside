import CreateCategory from '@/components/admin/category/CategoryCreate'
import CrudModal from '@/layouts/CrudModal'
import isLoggedIn from '@/lib/authorization/isLoggedIn'

const page = async () => {

  await isLoggedIn()

  return(
    <CrudModal>
      <CreateCategory/>
    </CrudModal>
  )
}

export default page