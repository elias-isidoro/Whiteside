import Categorizer from '@/components/admin/category/Categorizer';
import checkAuthorization from '@/lib/authorizer';

interface Props {
  params: {
    id: string
  }
}

const page = async ({params: {id}}:Props) => {

  await checkAuthorization()

  return(
    <div className='flex w-full justify-center pb-12'>
      <Categorizer key={`categorizer_${id}`} categoryId={id}/>
    </div>
  )
}

export default page