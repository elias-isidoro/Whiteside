import checkAuthorization from "@/lib/authorizer"

interface Props {
  params: {
    name: string
  }
}

const page = async ({params: {name}}: Props) => {

  await checkAuthorization()
  
  return(
    <div className=''>
      {name}
    </div>
  )
}

export default page