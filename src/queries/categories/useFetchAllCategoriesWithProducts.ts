import { Category, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useFetchAllCategoriesWithProducts = () => {
  
  const query = useQuery({
    queryKey:[`fetch_all_categories_with_products`],
    queryFn: async () => {
      const { data: {categories} } = await axios.get('/api/display/categories/all/with-products')
      return categories as (Category & { products: Product[] })[];
    },
  });

  return query
}

export default useFetchAllCategoriesWithProducts