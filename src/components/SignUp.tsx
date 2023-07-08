import { Icons } from './Icons'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'

const SignUp = () => {
  return(
    <div className='flex flex-col space-y-2 text-center'>
      
      <Icons.whiteside className='mx-auto h-11 w-11'/>
      <h1 className='text-2xl font-semibold tracking-tight'>Sign Up</h1>
      <p className='text-sm max-w-xs'>
        By continuing, you are setting up a whiteside account and agree to our User Agreement and Privacy Policy.
      </p>

      <UserAuthForm/>

      <p className='px-8 text-center text-sm text-zinc-700'>
        Already have an account?{' '}
        <Link href='/sign-in' className='hover:text-zinc-800 text-sm underline underline-offset-4'>
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default SignUp