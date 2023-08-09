import CategoryEdit from '@/components/admin/category/CategoryEdit'
import isLoggedIn from '@/lib/authorization/isLoggedIn'

interface Props {
  params: {
    id: string
  }
}

const page = async ({params: {id}}:Props) => {

  const user = await isLoggedIn()

  return(
    <div className='flex w-full justify-center pb-12'>
      <CategoryEdit key={`category_edit_${id}`} categoryId={id} userId={user!.id}/>
    </div>
  )
}

export default page