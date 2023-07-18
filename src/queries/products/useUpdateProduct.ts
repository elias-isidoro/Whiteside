import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils"
import { UpdateProductPayload } from "@/lib/validators/product";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useUpdateProduct = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:UpdateProductPayload) => {
      const {data} = await axios.put('/api/product', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
        if(err.response?.status === 405){
          onSuccessCallback&&onSuccessCallback()
          toastDefault('Cheers!','Product has been successfully updated!')
          return
        }
      }
      
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.', 'Could not update product.')
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers!','Product has been successfully updated!')
    }

  })

  return query

}

export default useUpdateProduct