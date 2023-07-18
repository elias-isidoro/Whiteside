import { useQuery } from "@tanstack/react-query";


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