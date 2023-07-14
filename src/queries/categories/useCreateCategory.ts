import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils"
import { CreateCategoryPayload } from "@/lib/validators/category";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useCreateCategory = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (input:string) => {
      const payload: CreateCategoryPayload = {
        name: input
      }
      const {data} = await axios.post('/api/category', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 409){
          return toastError('Category already exists',  'Please choose a different category name.')
        }

        if(err.response?.status === 422){
          return toastError('Invalid category name',err.response.data[0].message || 'Please choose a different category name.')
        }

        if(err.response?.status === 401){
          return loginToast()
        }
      }
      onErrorCallback&&onErrorCallback()
      toastError('There was an error.', 'Could not create category.')
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers', 'A new category has been successfully created')
    }

  })

  return query

}

export default useCreateCategory