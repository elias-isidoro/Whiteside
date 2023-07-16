import axios, { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import { toastDefault, toastError } from "@/lib/utils"
import { useCustomToast } from "@/hooks/use-custom-toast"

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}


type DeleteByIdPayload = {
  id: string
}

const useDeleteCategory = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:DeleteByIdPayload) => {
      const {data} = await axios.delete('/api/category', {params: payload})
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
      }
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.', 'Could not delete category.')
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers!','Category has been successfully deleted!')
    }
  })

  return query
}

export default useDeleteCategory