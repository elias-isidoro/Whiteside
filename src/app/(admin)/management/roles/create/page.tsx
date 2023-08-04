
import RoleCreate from "@/components/admin/roles/RoleCreate";
import checkAuthorization from "@/lib/authorizer";

const page = async () => {

  await checkAuthorization()
  
  return (
    <div className="flex w-full justify-center">
      <RoleCreate/>
    </div>
  )
}

export default page