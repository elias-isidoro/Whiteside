import ProductEdit from '@/components/admin/product/ProductEdit'
import CloseModal from '@/components/ui/CloseModal'
import isLoggedIn from '@/lib/authorization/isLoggedIn'

interface Props {
  params: {
    id: string
  }
}

const page = async ({params:{ id }}: Props) => {

  const user = await isLoggedIn()

  return(
    <div className='fixed inset-0 flex p-4 bg-zinc-900/20 z-10 min-w-[280px] overflow-y-auto overflow-x-hidden'>
      <div className='flex flex-col h-fit bg-white w-full max-w-[550px] items-center justify-center p-3 pb-8 pt-3 rounded-lg m-auto'>
        <div className='flex items-center w-full h-4'>
          <CloseModal/>
        </div>
          <ProductEdit productId={id} userId={user!.id}/>
      </div>
    </div>
    
  )
}

export default page