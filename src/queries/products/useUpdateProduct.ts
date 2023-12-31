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
        if(err.response?.status === 402){
          return toastError('Unauthorized',  'You are not allowed to perform this action.')
        }
        if(err.response?.status === 422){
          return toastError('Invalid input.', 
            err.response.data[0].message || 'Please make sure that your inputs are valid.')
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