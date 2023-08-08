import { buttonVariants } from '../ui/Button'
import Link from 'next/link'

const LoginButtons = () => {
  return(
    <>
      <Link href='/sign-in' className={buttonVariants({className:'hidden text-xs h-[35px] min-w-[65px] p-2 min-[550px]:flex', variant:'subtle'})}>Login</Link>
      <Link href='/sign-up' className={buttonVariants({className:'hidden text-xs h-[35px] min-w-[80px] p-2 min-[550px]:flex'})}>Sign Up</Link>
    </>
  )
}

export default LoginButtons