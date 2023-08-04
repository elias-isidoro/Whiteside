import { Role, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  roleId: string
}

type FetchByIdPayload = {
  id: string
}

const useFetchRole = ({roleId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_role_${roleId}`],
    queryFn: async () => {
      const payload: FetchByIdPayload = { id: roleId }
      const { data: {role} } = await axios.get('/api/role',{params:payload})
      return role as (Role & { users: User[] });
    },
  });

  return query
}

export default useFetchRole