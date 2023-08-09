import Categorizer from '@/components/admin/category/Categorizer';
import isLoggedIn from '@/lib/authorization/isLoggedIn';

interface Props {
  params: {
    id: string
  }
}

const page = async ({params: {id}}:Props) => {

  await isLoggedIn()

  return(
    <div className='flex w-full justify-center pb-12'>
      <Categorizer key={`categorizer_${id}`} categoryId={id}/>
    </div>
  )
}

export default page