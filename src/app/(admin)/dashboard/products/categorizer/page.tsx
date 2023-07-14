import checkAuthorization from '@/lib/authorizer'

interface Props {
  searchParams: {
    categoryId: string
  }
}

const page = async ({searchParams: {categoryId}}: Props) => {

  await checkAuthorization()

  return(
    <div className=''>
      {categoryId}
    </div>
  )
}

export default page