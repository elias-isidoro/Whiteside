
import RoleCreate from "@/components/admin/roles/RoleCreate";
import isLoggedIn from "@/lib/authorization/isLoggedIn";

const page = async () => {

  await isLoggedIn()
  
  return (
    <div className="flex w-full justify-center">
      <RoleCreate/>
    </div>
  )
}

export default page