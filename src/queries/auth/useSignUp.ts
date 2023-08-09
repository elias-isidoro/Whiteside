import { useCustomToast } from "@/hooks/use-custom-toast";
import { toastDefault, toastError } from "@/lib/utils"
import { RegisterUserPayload } from "@/lib/validators/auth";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import { delay } from "../../lib/utils";
interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const useSignUp = ({onSuccessCallback, onErrorCallback}:Props = {}) => {
  
  const {loginToast} = useCustomToast();

  const query = useMutation({
    mutationFn: async (payload: RegisterUserPayload) => {
      const {data} = await axios.post('/api/auth/register', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 409){
          return toastError('Email is already taken','Please enter a different email.')
        }

        if(err.response?.status === 410){
          return toastError('Name is already taken','Please enter a different name.')
        }

        if(err.response?.status === 422){
          return toastError('Invalid input', 
            err.response.data[0].message || 'Please make sure that your inputs are valid.')
        }

        if(err.response?.status === 401){
          return loginToast()
        }
      }
      onErrorCallback&&onErrorCallback()
      return toastError('There was an error.','Could not register user.')
    },

    onSuccess: async () => {
      onSuccessCallback&&onSuccessCallback()
      const { dismiss } = toastDefault('Cheers!','A new user has been successfully registered!')
      await delay(2000)
      dismiss()
    }

  })

  return query

}

export default useSignUp