
import RoleEdit from '@/components/admin/roles/RoleEdit'
import isLoggedIn from '@/lib/authorization/isLoggedIn'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await isLoggedIn()

  return (
    <RoleEdit roleId={id}/>
  )
}

export default page