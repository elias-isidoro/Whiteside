import { getAuthSession } from "@/lib/auth"
import { notFound } from "next/navigation"

interface Props {
  id: string
}

const isOwnerOfId = async ({id}: Props) => {
  const session = await getAuthSession()

  if(!session?.user) return notFound()

  if(session.user.id !== id) return notFound()

  return session.user
}

export default isOwnerOfId