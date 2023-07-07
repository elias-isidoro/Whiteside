import SignIn from '@/components/SignIn'
import { FC } from 'react'

interface Props {
  
}

const page: FC<Props> = ({}) => {
  return(
    <div className='absolute inset-0'>
      <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
        <div className='container flex w-full flex-col justify-center items-center space-y-6 sm:w-[400px]'>
          <SignIn/>
        </div>
      </div>
    </div>
  )
}

export default page