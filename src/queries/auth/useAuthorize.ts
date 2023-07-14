import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";
import { notFound } from "next/navigation";

const useAuthorize = () => {
  
  const query = useQuery({
    queryKey:[`get_auth_session`],
    queryFn: async () => {
      const { data: {session} } : {data:{session: Session}} = await axios.get('/api/auth/session')
      if(!session) return notFound()
      return session
    },
    refetchOnMount: true
  });

  return query
}

export default useAuthorize