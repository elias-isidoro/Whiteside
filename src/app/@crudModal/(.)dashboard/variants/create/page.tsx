import CloseModal from '@/components/ui/CloseModal'
import VariantCreate from '@/components/admin/variant/VariantCreate'
import checkAuthorization from '@/lib/authorizer'

const page = async () => {

  await checkAuthorization()
  
  return(
    <div className='fixed inset-0 flex p-4 bg-zinc-900/20 z-10 min-w-[280px] overflow-y-auto overflow-x-hidden'>
      <div className='flex flex-col h-fit bg-white w-fit items-center justify-center p-3 pb-8 rounded-lg m-auto'>
        <div className='flex items-center w-full h-4'>
          <CloseModal />
        </div>
        <VariantCreate/>
      </div>
    </div>
  )
}

export default page