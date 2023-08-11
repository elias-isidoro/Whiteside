import SignIn from '@/components/auth/SignIn'
import CrudModal from '@/layouts/CrudModal'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

const page =  async () => {
  
  const session = await getAuthSession()

  if(session) return redirect('/')

  return(
    <CrudModal>
      <SignIn/>
    </CrudModal>
  )
}

export default page