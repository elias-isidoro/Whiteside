import { Icons } from './Icons'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'

const SignIn = () => {
  return(
    <div className='flex flex-col space-y-2 text-center max-w-[300px]'>
      
      <Icons.logo className='mx-auto h-6 w-6'/>
      <h1 className='text-2xl font-semibold tracking-tight'>Sign in</h1>
      <p className='text-sm'>
        By continuing, you are setting up a reddit account and agree to our User Agreement and Privacy Policy.
      </p>

      <UserAuthForm/>

      <p className='px-8 text-center text-sm text-zinc-700'>
        New to Whiteside?{' '}
        <Link href='/sign-up' className='hover:text-zinc-800 text-sm underline underline-offset-4'>
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default SignIn