import CreateCategory from "@/components/admin/category/CategoryCreate";
import isLoggedIn from "@/lib/authorization/isLoggedIn";

const page = async () => {

  await isLoggedIn()
  
  return (
    <div className="flex w-full justify-center">
      <CreateCategory/>
    </div>
  )
}

export default page