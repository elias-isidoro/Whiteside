
import CategoryEdit from '@/components/admin/category/CategoryEdit'
import ModalLayout from '@/layouts/ModalLayout'
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

const page = async ({params: {id}}:Props) => {

  const session = await getAuthSession()

  const category = await db.category.findFirst({
    where: { id }
  });

  if(!session?.user || !category) return notFound()

  return(
    <ModalLayout>
      <CategoryEdit category={category}/> 
    </ModalLayout>
  )
}

export default page