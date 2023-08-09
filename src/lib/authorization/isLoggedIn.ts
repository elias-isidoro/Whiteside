import { getAuthSession } from "@/lib/auth"
import { notFound } from "next/navigation"


const isLoggedIn = async () => {
  const session = await getAuthSession()

  if(!session?.user) return notFound()

  return session.user
}

export default isLoggedIn