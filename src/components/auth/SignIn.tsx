'use client'

import { useState } from 'react'
import { signIn, SignInResponse } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/use-toast'
import { Icons } from '../ui/Icons'
import { Input } from '../ui/Input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignIn = () => {


  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = async () => {
    
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithCrendentials = async () => {
    setIsLoading(true)
    try {
      await signIn("credentials",{ 
        email, 
        password, 
        redirect: false
      }).then((result?: SignInResponse)=>{
        if(!result){
          toast({
            title: 'Error',
            description: 'There was an error logging in.',
            variant: 'destructive',
          })
          return
        }
        if(result.error==='CredentialsSignin' || result.url === null){
          toast({
            title: 'Error',
            description: 'Invalid username or password. Please try again.',
            variant: 'destructive',
          })
          return 
        }

        router.back()
        router.refresh()

      })
      //customly  redirect here
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className='flex flex-col space-y-2 text-center w-full max-w-[350px]'>
      
      <Icons.whiteside className='mx-auto h-11 w-11'/>
      <h1 className='text-2xl font-semibold tracking-tight'>Sign in</h1>

      <div className='flex flex-col justify-center gap-4'>
        <div className='flex flex-col gap-2 justify-center'>
          <Input 
          disabled={isLoading}
          placeholder={'Email'}
          value={email}
          onChange={(e)=>{ setEmail(e.target.value) }}
          className='border border-slate-700 text-xs'/>

          <Input 
          disabled={isLoading}
          placeholder={'Password'}
          value={password}
          type='password'
          onChange={(e)=>{ setPassword(e.target.value) }}
          className='border border-slate-700 text-xs'/>

          <Button
            isLoading={isLoading}
            type='button'
            size='sm'
            className='w-full'
            onClick={loginWithCrendentials}
            disabled={isLoading}>
            Login
          </Button>
        </div>
        
        <p className='text-center text-gray-600 text-sm'>or</p>

        <Button
          isLoading={isLoading}
          type='button'
          size='sm'
          className='w-full'
          onClick={loginWithGoogle}
          disabled={isLoading}>
          {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
          Sign In with Google
        </Button>
      </div>

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