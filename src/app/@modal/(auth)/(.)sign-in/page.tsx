import SignIn from '@/components/auth/SignIn'
import CrudModal from '@/layouts/CrudModal'

const page = () => {
  return(
    <CrudModal>
      <SignIn/>
    </CrudModal>
  )
}

export default page