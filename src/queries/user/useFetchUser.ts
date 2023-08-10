import { Order, Role, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  userId: string
}

type FetchByIdPayload = {
  id: string
}

interface AxiosResult {
  data: {
    user: User & {
      role: Role,
      ordersCreated: Order[]
    }
  }
}

const useFetchUser = ({userId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_user_${userId}`],
    queryFn: async () => {
      const payload: FetchByIdPayload = { id: userId }
      const { data: {user} }: AxiosResult = await axios.get('/api/user',{params:payload})
      return user
    },
  });

  return query
}

export default useFetchUser