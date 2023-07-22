import { Payment } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  paymentId: string
}

const useSpecificPayment = ({paymentId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_payment_${paymentId}`],
    queryFn: async () => {
      const { data: { payment } } = await axios.get(`/api/payment`,{params:{ id: paymentId }})
      return payment as Payment
    },
  });

  return query
}

export default useSpecificPayment