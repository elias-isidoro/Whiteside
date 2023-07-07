import ProductShowcase from '@/components/admin/product/ProductShowcase'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    categoryName: string
  }
}

const page = async ({params:{categoryName}}: Props) => {

  const session = await getAuthSession()

  const products = await db.product.findMany({
    include: {
      variants: true
    }
  });


  if(!session?.user || !products) return notFound()

  return(
    <>
      <h1 className='font-bold text-3xl md:text-4xl h-14 text-yellow-500'>
        {categoryName.split('%20').join(' ')}
      </h1>

      <ProductShowcase products={products}/>
    </>
  )
}

export default page