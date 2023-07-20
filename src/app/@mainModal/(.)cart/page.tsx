import Cart from '@/components/customer/cart/Cart'
import CloseModal from '@/components/ui/CloseModal'
import checkAuthorization from '@/lib/authorizer'


const page = async () => {

  const user = await checkAuthorization()

  return (
    <div className='fixed inset-0 flex p-4 bg-zinc-900/20 z-[50] min-w-[280px] overflow-y-hidden overflow-x-hidden'>
      <div className='flex flex-col h-fit bg-white w-full max-w-[600px] items-center justify-center p-3 rounded-lg m-auto'>
        <div className='flex items-center w-full h-4'>
          <CloseModal/>
        </div>
        <Cart user={user}/>
      </div>
    </div>
  )
}

export default page