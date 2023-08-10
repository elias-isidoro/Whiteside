import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils"
import { UpdateUserProfilePayload } from "@/lib/validators/user";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useUpdateUserProfile = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload:UpdateUserProfilePayload) => {
      const {data} = await axios.put('/api/user', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }

        if(err.response?.status === 409){
          return toastError('Username is already taken','Please use a different username.')
        }

        if(err.response?.status === 422){
          return toastError('Invalid input.', 
            err.response.data[0].message || 'Please make sure that your inputs are valid.')
        }
      }
      
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.', "Could not update the user's profile.")
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
      toastDefault('Cheers!',"User has been successfully updated!")
    }

  })

  return query

}

export default useUpdateUserProfile