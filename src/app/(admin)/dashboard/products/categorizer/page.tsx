import isLoggedIn from '@/lib/authorization/isLoggedIn'

interface Props {
  searchParams: {
    categoryId: string
  }
}

const page = async ({searchParams: {categoryId}}: Props) => {

  await isLoggedIn()

  return(
    <div className=''>
      {categoryId}
    </div>
  )
}

export default page