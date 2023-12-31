import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

type DeleteByIdPayload = {
  id: string
}

const useDeleteProduct = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload: DeleteByIdPayload) => {
      const {data} = await axios.delete('/api/product', {params:payload})
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