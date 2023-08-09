
import RoleEdit from '@/components/admin/roles/RoleEdit'
import isLoggedIn from '@/lib/authorization/isLoggedIn'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  const user = await isLoggedIn()

  return (
    <RoleEdit roleId={id} userId={user!.id}/>
  )
}

export default page