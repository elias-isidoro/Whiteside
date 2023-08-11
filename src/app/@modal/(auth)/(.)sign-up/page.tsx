import SignUp from '@/components/auth/SignUp'
import CrudModal from '@/layouts/CrudModal'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

const page =  async () => {
  
  const session = await getAuthSession()

  if(session) return redirect('/')
  
  return(
    <CrudModal>
      <SignUp/>
    </CrudModal>
  )
}

export default page