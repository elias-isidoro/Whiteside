import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils"
import { UpdateCategoryPayload } from "@/lib/validators/category";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useUpdateCategory = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:UpdateCategoryPayload) => {
      const {data} = await axios.put('/api/category', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
        if(err.response?.status === 400){
          return toastError('Category name already exists', err.response.data[0].message || 'Please choose a different category name.')
        }
      }
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.', 'Could not update category.')
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers!','Category has been successfully updated!')
    }
  })

  return query
}

export default useUpdateCategory