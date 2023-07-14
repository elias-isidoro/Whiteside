import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toastDefault, toastError } from "@/lib/utils";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { UncategorizeProductsPayload } from "@/lib/validators/categorizer";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useUncategorizeProducts = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:UncategorizeProductsPayload) => {
      const {data} = await axios.put('/api/actions/uncategorize', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
      }
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.', 'Could not perform the uncategorization.')
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers!','Uncategorization success.')
    }
  })

  return query
}

export default useUncategorizeProducts