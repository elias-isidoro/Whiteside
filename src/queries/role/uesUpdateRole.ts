import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils";
import { UpdateRolePayload } from "@/lib/validators/role";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useUpdateRole = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:UpdateRolePayload) => {
      const {data} = await axios.put('/api/role', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
        if(err.response?.status === 405){
          onSuccessCallback&&onSuccessCallback()
          toastDefault('Cheers!','Role has been successfully updated!')
          return
        }
      }
      
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.', 'Could not update role.')
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers!','Role has been successfully updated!')
    }

  })

  return query

}

export default useUpdateRole