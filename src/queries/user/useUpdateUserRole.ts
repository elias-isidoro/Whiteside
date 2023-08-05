import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils"
import { UpdateUserRolePayload } from "@/lib/validators/user";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useUpdateUserRole = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:UpdateUserRolePayload) => {
      const {data} = await axios.put('/api/user', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
      }
      
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.', "Could not update the user's role.")
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers!',"User has been successfully updated!")
    }

  })

  return query

}

export default useUpdateUserRole