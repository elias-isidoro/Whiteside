import { FetchProductsByCategoryPayload } from "@/lib/validators/fetch";
import { Product, Variant } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  categoryId: string
}

const useFetchProductsNotUnder = ({categoryId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_products_not_under_${categoryId}`],
    queryFn: async () => {
      const payload:FetchProductsByCategoryPayload = { categoryId }
      const { data: {products} } = await axios.get('/api/categorizer/not_under',{params: payload});
      return products as (Product & { variants: Variant[] })[];
    },
    cacheTime:0
  });

  return query
}

export default useFetchProductsNotUnder