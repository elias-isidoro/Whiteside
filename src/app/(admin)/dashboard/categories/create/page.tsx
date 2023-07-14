import CreateCategory from "@/components/admin/category/CategoryCreate";
import checkAuthorization from "@/lib/authorizer";

const page = async () => {

  await checkAuthorization()
  
  return (
    <div className="flex w-full justify-center">
      <CreateCategory/>
    </div>
  )
}

export default page