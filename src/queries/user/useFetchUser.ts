import { Orders, Role, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  userId: string
}

type FetchByIdPayload = {
  id: string
}

const useFetchUser = ({userId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_user_${userId}`],
    queryFn: async () => {
      const payload: FetchByIdPayload = { id: userId }
      const { data: {user} } = await axios.get('/api/user',{params:payload})
      return user as (User & { Role: Role, Orders: Orders });
    },
  });

  return query
}

export default useFetchUser