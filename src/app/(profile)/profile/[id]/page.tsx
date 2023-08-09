import UserProfile from '@/components/user/UserProfile'
import isOwnerOfId from '@/lib/authorization/isOwnerOfId'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await isOwnerOfId({id})

  return (
    <div className='w-full flex justify-center'>
      <UserProfile userId={id}/>
    </div>
  )
}

export default page