import CategoryCard from "@/components/admin/category/CategoryCard";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const page  = async () => {

  const session = await getAuthSession()

  const categories = await db.category.findMany();

  if(!session?.user || !categories) return notFound()
  
  return(
    <>
      <h1 className='font-bold text-3xl md:text-4xl h-14'>
        Categories
      </h1>

      <div className='flex flex-wrap w-full gap-2'>

        {categories.map((category)=><CategoryCard key={`categoryCard_${category.id}`} category={category}/>)}
        
        <Link 
        href={`/dashboard/create-category`} 
        className={buttonVariants({className:'text-center p-2 border border-slate-800 rounded-md'})}>
          <Plus/>
        </Link>
      </div>
    </>
  )
}

export default page