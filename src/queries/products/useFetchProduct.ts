import { Category, Product, User, Variant } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  productId: string
}

type FetchByIdPayload = {
  id: string
}

interface AxiosResult {
  data: {
    product: Product & {
      author: User,
      category: Category,
      variants: Variant[],
    }
  }
}

const useFetchProduct = ({productId}: Props) => {
  
  const query = useQuery({
    queryKey:[`fetch_product_${productId}`],
    queryFn: async () => {
      const payload: FetchByIdPayload = { id: productId }
      const { data: {product} }: AxiosResult = await axios.get('/api/product',{params:payload})
      return product
    },
  });

  return query
}

export default useFetchProduct