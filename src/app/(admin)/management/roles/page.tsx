import ManagementNav from "@/components/admin/navbar/ManagementNav"
import RolesShowcase from "@/components/admin/roles/RolesShowcase"
import checkAuthorization from "@/lib/authorizer"


const page  = async () => {

  await checkAuthorization()
  
  return(
    <>
      <ManagementNav focus={'Roles'}/>
      <RolesShowcase/>
    </>
  )
}

export default page