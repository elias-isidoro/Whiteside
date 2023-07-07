'use client'

import { X } from "lucide-react"
import { Button } from "./Button"
import { useRouter } from "next/navigation"

const CloseModal = () => {

  const router = useRouter()

  return(
    <Button 
    variant='subtle'
    aria-label='close modal'
    onClickCapture={()=>router.back()}
    className='aspect-square h-full  p-0 rounded-md bg-white ml-auto'>
      <X className="h-full w-full"/>
    </Button>
  )
}

export default CloseModal