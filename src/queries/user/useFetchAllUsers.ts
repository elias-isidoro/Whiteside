import {  Role, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface AxiosResult {
  data: {
    users: (User & {
      role: Role
    })[]
  }
}

const useFetchAllUsers = () => {
  
  const query = useQuery({
    queryKey:[`fetch_all_users`],
    queryFn: async () => {
      const { data: {users} }: AxiosResult = await axios.get('/api/display/users/all')
      return users
    },
  });

  return query
}

export default useFetchAllUsers