import { Role, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  roleId: string
}

type FetchByIdPayload = {
  id: string
}

interface AxiosResult {
  data: {
    role: Role & {
      users: User[]
    }
  }
}

const useFetchRole = ({roleId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_role_${roleId}`],
    queryFn: async () => {
      const payload: FetchByIdPayload = { id: roleId }
      const { data: {role} }: AxiosResult = await axios.get('/api/role',{params:payload})
      return role
    },
  });

  return query
}

export default useFetchRole