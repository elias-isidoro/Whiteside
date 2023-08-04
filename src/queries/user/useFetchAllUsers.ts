import {  Role, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchAllUsers = () => {
  
  const query = useQuery({
    queryKey:[`fetch_all_users`],
    queryFn: async () => {
      const { data: {users} } = await axios.get('/api/display/users/all')
      return users as (User & { role: Role })[];
    },
  });

  return query
}

export default useFetchAllUsers