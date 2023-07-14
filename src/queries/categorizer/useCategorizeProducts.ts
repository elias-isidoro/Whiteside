import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toastDefault, toastError } from "@/lib/utils";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { CategorizeProductsPayload } from "@/lib/validators/categorizer";

const useCategorizeProducts = () => {
  
  const router = useRouter();
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:CategorizeProductsPayload) => {
      const {data} = await axios.put('/api/actions/categorize', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
        if(err.response?.status === 400){
          return toastError('Category does not exist', 'Please specify a category.')
        }
      }
      return toastError('There was an error.', 'Could not perform the categorization.')
    },

    onSuccess: () => {
      router.back()
      toastDefault('Cheers!','Categorization success!')
    }
  })

  return query
}

export default useCategorizeProducts