import CloseModal from '@/components/ui/CloseModal'
import CreateProduct from "@/components/admin/product/ProductCreate"
import isLoggedIn from '@/lib/authorization/isLoggedIn'

const page = async () => {

  await isLoggedIn()

  return(
    <div className='fixed inset-0 flex p-4 bg-zinc-900/20 z-10 min-w-[280px] overflow-y-auto overflow-x-hidden'>
      <div className='flex flex-col h-fit bg-white w-full max-w-[550px] items-center justify-center p-3 pb-8 rounded-lg m-auto'>
        <div className='flex items-center w-full h-4'>
          <CloseModal />
        </div>
        <CreateProduct/>
      </div>
    </div>
  )
}

export default page