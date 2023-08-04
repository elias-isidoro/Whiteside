
import checkAuthorization from '@/lib/authorizer'

interface Props {
  params:{
    id: string
  }
}

const page = async ({params: {id}}: Props) => {

  await checkAuthorization()

  return (
    <>{id}</>
  )
}

export default page