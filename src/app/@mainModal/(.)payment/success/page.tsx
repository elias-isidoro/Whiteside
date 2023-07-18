
import CloseModal from '@/components/ui/CloseModal'

const page= () => {
  
  return(
    <div className='fixed inset-0 flex p-4 bg-zinc-900/20 z-10 min-w-[280px] overflow-y-auto overflow-x-hidden'>
      <div className='flex flex-col h-fit bg-white w-fit max-w-[550px] items-center justify-center p-3 rounded-lg m-auto'>
        <div className='flex items-center w-full h-4'>
          <CloseModal/>
        </div>
        <div className='p-4 flex w-full justify-center items-center text-xs'>
          <p>This is a mock success page.</p>
          <p> Thanks for buying!</p>
        </div>
      </div>
    </div>
  )
}

export default page