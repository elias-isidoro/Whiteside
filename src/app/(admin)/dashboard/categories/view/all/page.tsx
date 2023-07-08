import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import CategoryShowcase from "@/components/admin/category/CategoryShowcase";

const page  = async () => {

  const session = await getAuthSession()

  const categories = await db.category.findMany();

  if(!session?.user || !categories) return notFound()
  
  return(
    <CategoryShowcase categories={categories}/>
  )
}

export default page