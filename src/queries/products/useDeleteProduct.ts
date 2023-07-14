import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils";
import { DeleteProductPayload } from "@/lib/validators/product";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useDeleteProduct = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:DeleteProductPayload) => {
      const {data} = await axios.delete('/api/product', {params:payload})
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
      }
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.','Could not delete product.')
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers!','Product has been successfully deleted!')
    }
  })

  return query

}

export default useDeleteProduct