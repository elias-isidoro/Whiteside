/* eslint-disable no-unused-vars */
'use client'

import { CreatePaymongoLinkPayload } from "@/lib/validators/paymongo";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
}


const usePaymentLink = ({onSuccessCallback, onErrorCallback}:Props = {}) => {

  
  const query = useMutation({
    mutationFn: async ({callback, ...payload}: CreatePaymongoLinkPayload & ({callback:(link: string)=>void})) => {
      const { data:{ link } } = await axios.post('/api/payment/link', payload)
      callback(link)
      return 
    },
    onError: () => {
      onErrorCallback&&onErrorCallback()
    },

    onSuccess: () => {
      onSuccessCallback&&onSuccessCallback()
    }
  });

  return query
}

export default usePaymentLink