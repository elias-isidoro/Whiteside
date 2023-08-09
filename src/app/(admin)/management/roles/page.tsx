import ManagementNav from "@/components/admin/navbar/ManagementNav"
import RolesShowcase from "@/components/admin/roles/RolesShowcase"
import isLoggedIn from "@/lib/authorization/isLoggedIn"


const page  = async () => {

  await isLoggedIn()
  
  return(
    <>
      <ManagementNav focus={'Roles'}/>
      <RolesShowcase/>
    </>
  )
}

export default page