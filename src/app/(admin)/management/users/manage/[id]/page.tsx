
import UserManage from '@/components/admin/users/UserManage'
import checkAuthorization from '@/lib/authorizer'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await checkAuthorization()

  return (
    <div className='w-full flex justify-center'>
      <UserManage userId={id}/>
    </div>
  )
}

export default page