import CategoryEdit from '@/components/admin/category/CategoryEdit'
import checkAuthorization from '@/lib/authorizer'

interface Props {
  params: {
    id: string
  }
}

const page = async ({params: {id}}:Props) => {

  await checkAuthorization()

  return(
    <div className='flex w-full justify-center pb-12'>
      <CategoryEdit key={`category_edit_${id}`} categoryId={id}/>
    </div>
  )
}

export default page