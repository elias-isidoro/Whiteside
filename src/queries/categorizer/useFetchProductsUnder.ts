import { FetchProductsByCategoryPayload } from "@/lib/validators/fetch";
import { Product, Variant } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  categoryId: string
}

const useFetchProductsUnder = ({categoryId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_products_under_${categoryId}`],
    queryFn: async () => {
      const payload:FetchProductsByCategoryPayload = { categoryId }
      const { data: {products} } = await axios.get('/api/categorizer/under',{params: payload});
      return products as (Product & { variants: Variant[] })[];
    },
    refetchOnMount: true,
  });

  return query
}

export default useFetchProductsUnder