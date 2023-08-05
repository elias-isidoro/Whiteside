import { Role } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useFetchAllRoles = () => {
  
  const query = useQuery({
    queryKey:[`fetch_all_roles`],
    queryFn: async () => {
      const { data: {roles} } = await axios.get('/api/display/roles/all')
      return roles as Role[];
    },
  });

  return query
}

export default useFetchAllRoles