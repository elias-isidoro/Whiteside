import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useFetchAllCategories = () => {
  
  const query = useQuery({
    queryKey:[`fetch_all_categories`],
    queryFn: async () => {
      const { data: {categories} } = await axios.get('/api/display/categories/all')
      return categories as Category[];
    },
    refetchOnMount: true,
    refetchInterval: 0
  });

  return query
}

export default useFetchAllCategories