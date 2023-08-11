import SignUp from '@/components/auth/SignUp'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'


const page = async () => {

  const session = await getAuthSession()

  if(session) return redirect('/')

  return(
    <div className='w-full h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
      <div className='container flex w-full flex-col justify-center items-center space-y-6 sm:w-[400px]'>
        <SignUp/>
      </div>
    </div>
  )
}

export default page