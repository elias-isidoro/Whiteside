import { getAuthSession } from "@/lib/auth"
import { notFound } from "next/navigation"


const checkAuthorization = async () => {
  const session = await getAuthSession()

  if(!session?.user) return notFound()

  return
}

export default checkAuthorization