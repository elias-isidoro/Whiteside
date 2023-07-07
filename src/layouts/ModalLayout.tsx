import CloseModal from '@/components/ui/CloseModal'
import React, { FC } from 'react'

interface Props {
  children: React.ReactNode
}

const ModalLayout: FC<Props> = ({children}) => {
  return(
    <div className='fixed inset-0 bg-zinc-900/20 z-10 min-w-[280px]'>
      <div className='container flex items-center justify-center h-full max-w-lg mx-auto'>
        <div className='flex flex-col bg-white h-fit p-2 rounded-lg gap-3'>
          <div className='flex items-center w-full h-4'>
            <CloseModal/>
          </div>

          <div className='flex items-center justify-center p-4 pb-8'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalLayout