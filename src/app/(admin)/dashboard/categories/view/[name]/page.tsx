import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    name: string
  }
}

const page  = async ({params: {name}}: Props) => {

  const session = await getAuthSession()

  const category = await db.category.findFirst({
    where: { name: name.split('%20').join(' ') },
    include: {
      products: {
        include: {
          variants: true
        }
      }
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS
  });

  if(!session?.user || !category) return notFound()
  
  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl h-14'>
        {category.name}
      </h1>

      {/* <CategoryShowcase category={category}/> */}
    </>
  )
}

export default page