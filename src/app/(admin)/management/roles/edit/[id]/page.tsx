
import RoleEdit from '@/components/admin/roles/RoleEdit'
import checkAuthorization from '@/lib/authorizer'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await checkAuthorization()

  return (
    <RoleEdit roleId={id}/>
  )
}

export default page