
import UserManage from '@/components/admin/users/UserManage'
import isLoggedIn from '@/lib/authorization/isLoggedIn'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  const user = await isLoggedIn()

  return (
    <div className='w-full flex justify-center'>
      <UserManage userId={id} guestId={user!.id}/>
    </div>
  )
}

export default page