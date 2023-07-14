import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils"
import { CreateProductPayload } from "@/lib/validators/product";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useCreateProduct = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:CreateProductPayload) => {
      const {data} = await axios.post('/api/product', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 409){
          return toastError('Product already exists','Please choose a different product name.')
        }

        if(err.response?.status === 422){
          return toastError('Invalid product name', 
            err.response.data[0].message || 'Please choose a different product name.')
        }

        if(err.response?.status === 401){
          return loginToast()
        }
      }
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.','Could not create product.')
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers!','A new product has been successfully created!')
    }

  })

  return query

}

export default useCreateProduct