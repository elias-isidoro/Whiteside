import { Product, User, Variant } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface AxiosResult {
  data: {
    products: (Product & {
      author: User,
      variants: Variant[],
    }) []
  }
}

const useFetchAllProducts = () => {
  
  const query = useQuery({
    queryKey:[`fetch_all_products`],
    queryFn: async () => {
      const { data: {products} }:AxiosResult = await axios.get('/api/display/products/all')
      return products
    },
  });

  return query
}

export default useFetchAllProducts