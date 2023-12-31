import ProductView from '@/components/customer/product/ProductView'
import CloseModal from '@/components/ui/CloseModal'
import { getAuthSession } from '@/lib/auth'

interface Props {
  params: {
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  const session = await getAuthSession()

  return(
    <div className='fixed inset-0 flex p-4 bg-zinc-900/20 z-10 min-w-[280px] overflow-y-auto overflow-x-hidden'>
      <div className='flex flex-col h-fit bg-white w-fit max-w-[550px] items-center justify-center p-3 rounded-lg m-auto'>
        <div className='flex items-center w-full h-4'>
          <CloseModal/>
        </div>
        <ProductView productVariantId={id} session={session}/>
      </div>
    </div>
    
  )
}

export default page