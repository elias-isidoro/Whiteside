import ManagementNav from "@/components/admin/navbar/ManagementNav"
import UsersShowcase from "@/components/admin/users/UsersShowcase"
import checkAuthorization from "@/lib/authorizer"


const page  = async () => {

  await checkAuthorization()
  
  return(
    <>
      <ManagementNav focus={'Users'}/>
      <UsersShowcase/>
    </>
  )
}

export default page