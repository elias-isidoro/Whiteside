import SignUp from '@/components/auth/SignUp'
import CrudModal from '@/layouts/CrudModal'

const page = () => {
  return(
    <CrudModal>
      <SignUp/>
    </CrudModal>
  )
}

export default page