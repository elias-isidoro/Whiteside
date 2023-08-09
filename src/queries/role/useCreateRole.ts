import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils"
import { CreateRolePayload } from "@/lib/validators/role";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useCreateRole = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:CreateRolePayload) => {
      const {data} = await axios.post('/api/role', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 409){
          return toastError('Role already exists',  'Please choose a different role name.')
        }

        if(err.response?.status === 422){
          return toastError('Invalid input.', 
            err.response.data[0].message || 'Please make sure that your inputs are valid.')
        }

        if(err.response?.status === 401){
          return loginToast()
        }
      }
      onErrorCallback&&onErrorCallback()
      toastError('There was an error.', 'Could not create role.')
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers', 'A new role has been successfully created')
    }

  })

  return query

}

export default useCreateRole