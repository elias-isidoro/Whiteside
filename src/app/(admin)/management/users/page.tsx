import ManagementNav from "@/components/admin/navbar/ManagementNav"
import UsersShowcase from "@/components/admin/users/UsersShowcase"
import isLoggedIn from "@/lib/authorization/isLoggedIn"


const page  = async () => {

  await isLoggedIn()
  
  return(
    <>
      <ManagementNav focus={'Users'}/>
      <UsersShowcase/>
    </>
  )
}

export default page