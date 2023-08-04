import { Category, Product, Variant } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  productId: string
}

type FetchByIdPayload = {
  id: string
}

const useFetchProduct = ({productId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_product_${productId}`],
    queryFn: async () => {
      const payload: FetchByIdPayload = { id: productId }
      const { data: {product} } = await axios.get('/api/product',{params:payload})
      return product as (Product & { variants: Variant[], Category: Category });
    },
  });

  return query
}

export default useFetchProduct