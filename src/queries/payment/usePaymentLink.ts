'use client'

import { useCustomToast } from "@/hooks/use-custom-toast";
import { openInNewTab } from "@/lib/utils";
import { CreatePaymongoLinkPayload } from "@/lib/validators/paymongo";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}

const usePaymentLink = ({onSuccessCallback, onErrorCallback}:Props = {}) => {

  const {loginToast} = useCustomToast();
  
  const query = useMutation({
    mutationFn: async (payload: CreatePaymongoLinkPayload) => {
      const { data: { link } } = await axios.post('/api/payment/link', payload)
      if(!link) return
      openInNewTab(link)
      return 
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 401){
          return loginToast()
        }
      }
      onErrorCallback&&onErrorCallback()
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
    }
  });

  return query
}

export default usePaymentLink