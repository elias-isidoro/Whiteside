import { Product, Variant } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useFetchAllProducts = () => {
  
  const query = useQuery({
    queryKey:[`fetch_all_products`],
    queryFn: async () => {
      const { data: {products} } = await axios.get('/api/display/products/all')
      return products as (Product & { variants: Variant[] })[];
    },
  });

  return query
}

export default useFetchAllProducts