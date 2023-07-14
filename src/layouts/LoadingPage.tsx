import { notFound } from 'next/navigation'
import { FC } from 'react'

interface Props {
  isLoading: boolean,
  focus: any,
  children: React.ReactNode
  loader?: React.ReactNode
}

const LoadingPage: FC<Props> = ({isLoading, focus, children, loader}) => {

  if(isLoading){
    return <div className='flex bg-white p-4 items-center justify-center'>Loading...</div>
  }

  if(!focus){
    return loader ? <>{loader}</>:notFound()
  }

  return(
    <>{children}</>
  )
}

export default LoadingPage