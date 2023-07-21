import { Payment } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useAllPayments = () => {
  
  const query = useQuery({
    queryKey:[`fetch_all_payments`],
    queryFn: async () => {
      const { data: { payments } } = await axios.get('/api/payment/list')
      return payments as Payment[]
    },
  });

  return query
}

export default useAllPayments