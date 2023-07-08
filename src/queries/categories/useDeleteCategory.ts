import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toastDefault, toastError } from "@/lib/utils"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { DeleteCategoryPayload } from "@/lib/validators/category"

const useDeleteCategory = () => {
  
  const router = useRouter();
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:DeleteCategoryPayload) => {
      const {data} = await axios.delete('/api/category', {params: payload})
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
      }
      return toastError('There was an error.', 'Could not delete category.')
    },

    onSuccess: () => {
      router.back()
      router.refresh()
      toastDefault('Cheers!','Category has been successfully deleted!')
    }
  })

  return query
}

export default useDeleteCategory