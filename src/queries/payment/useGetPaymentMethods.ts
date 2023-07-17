import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useGetPaymentMethods = () => {
  
  const query = useQuery({
    queryKey:[`fetch_payment_methods`],
    queryFn: async () => {
      // const { data: {methods} } = await axios.get('/payment/methods')
      // return methods as any
      return {data:[]}
    },
  });

  return query
}

export default useGetPaymentMethods