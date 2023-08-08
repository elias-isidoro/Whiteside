'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/use-toast'
import { Icons } from '../ui/Icons'
import { Input } from '../ui/Input'
import Link from 'next/link'
import useSignUp from '@/queries/auth/useSignUp'
import { useRouter } from 'next/navigation'

const SignUp = () => {

  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false)

  const {mutate: registerUser, isLoading: isRegisteringUser} = useSignUp({
    onSuccessCallback: () => {
      router.replace('/sign-in')
    }
  })

  const loginWithGoogle = async () => {
    setIsSigningInWithGoogle(true)
    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsSigningInWithGoogle(false)
    }
  }

  const signUpWithCredentials = async () => {
    registerUser({
      email,
      password,
      name: username,
    })
  }

  return(
    <div className='flex flex-col space-y-2 text-center w-full max-w-[350px]'>
      
      <Icons.whiteside className='mx-auto h-11 w-11'/>
      <h1 className='text-2xl font-semibold tracking-tight'>Sign Up</h1>

      <div className='flex flex-col justify-center gap-4'>
        <div className='flex flex-col gap-2 justify-center'>
        <Input 
          disabled={isSigningInWithGoogle || isRegisteringUser}
          placeholder={'Name'}
          value={username}
          onChange={(e)=>{ setUsername(e.target.value) }}
          className='border border-slate-700 text-xs'/>

          <Input 
          disabled={isSigningInWithGoogle || isRegisteringUser}
          placeholder={'Email'}
          value={email}
          onChange={(e)=>{ setEmail(e.target.value) }}
          className='border border-slate-700 text-xs'/>

          <Input 
          disabled={isSigningInWithGoogle || isRegisteringUser}
          placeholder={'Password'}
          value={password}
          type='password'
          onChange={(e)=>{ setPassword(e.target.value) }}
          className='border border-slate-700 text-xs'/>

          <Button
            isLoading={isRegisteringUser}
            type='button'
            size='sm'
            className='w-full'
            onClick={signUpWithCredentials}
            disabled={isSigningInWithGoogle || isRegisteringUser}>
            Register
          </Button>
        </div>
        
        <p className='text-center text-gray-600 text-sm'>or</p>

        <Button
          isLoading={isSigningInWithGoogle}
          type='button'
          size='sm'
          className='w-full'
          onClick={loginWithGoogle}
          disabled={isSigningInWithGoogle || isRegisteringUser}>
          {isSigningInWithGoogle ? null : <Icons.google className='h-4 w-4 mr-2' />}
          Sign In with Google
        </Button>
      </div>

      <p className='px-8 text-center text-sm text-zinc-700'>
        Already have an account?{' '}
        <Link href='/sign-up' className='hover:text-zinc-800 text-sm underline underline-offset-4'>
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default SignUp