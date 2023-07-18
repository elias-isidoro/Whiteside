import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  categoryId: string
 }

 type FetchByIdPayload = {
  id: string
}

const useFetchCategory = ({categoryId}:Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_category_${categoryId}`],
    queryFn: async () => {
      const payload: FetchByIdPayload = { id: categoryId }
      const { data: {category} } = await axios.get('/api/category', {params: payload})

      return category as Category;
    },
  });

  return query
}

export default useFetchCategory