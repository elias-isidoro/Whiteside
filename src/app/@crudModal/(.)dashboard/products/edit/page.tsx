import CloseModal from '@/components/ui/CloseModal'
import checkAuthorization from '@/lib/authorizer'

const page = async () => {

  await checkAuthorization()

  return(
    <div className='fixed inset-0 bg-zinc-900/20 z-10'>
      <div className='container flex items-center h-full max-w-lg mx-auto gap-2'>
        <div className='relative bg-white w-full h-fit py-20 rounded-lg'>
          <div className='absolute top-4 right-4'>
            <CloseModal/>
          </div>

          {/* <SignIn/> */}
        </div>
      </div>
    </div>
  )
}

export default page