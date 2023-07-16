import { Variant } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  variantId: string
}

type FetchByIdPayload = {
  id: string
}

const useFetchVariant = ({variantId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_variant_${variantId}`],
    queryFn: async () => {
      const payload: FetchByIdPayload = { id: variantId }
      const { data: {variant} } = await axios.get('/api/variant',{params:payload})
      return variant as Variant;
    },
  });

  return query
}

export default useFetchVariant