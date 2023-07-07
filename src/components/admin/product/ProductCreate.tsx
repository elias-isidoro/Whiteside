'use client'

import axios, { AxiosError } from 'axios';
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from "@/hooks/use-custom-toast";
import { CreateProductPayload } from "@/lib/validators/product";
import VariantShowcase from "../variant/VariantShowcase";
import { toastDefault, toastError } from "@/lib/utils";
import useImageUploader from "@/hooks/use-image-uploader";
import { useUnsavedProductStore } from "@/hooks/use-unsaved-product-store";
import { nanoid } from "nanoid";


const ProductCreate = () => {

  const router = useRouter();
  const {loginToast} = useCustomToast();
  const {uploadImages, isUploading} = useImageUploader({toastOnSuccess: false})
  const {
    productName, 
    unsavedVariants, 
    productDescription, 
    setProductName,
    resetUnsavedStates,
    setProductDescription, 
  } = useUnsavedProductStore()

  const handleSubmit = async () => {

    const files = unsavedVariants.map(({image,id})=>({file:image,id}))

    const uploadResults = await uploadImages(files).catch(()=>{ return })

    if(!uploadResults || files.length !== uploadResults.length) return

    const variants = []

    for (let i = 0; i < unsavedVariants.length; i++) {

      const imageUrl = uploadResults[i].url
      const { id, tags, price } = unsavedVariants[i]
      variants.push({ id, tags, price, imageUrl })
      
    }
    
    const payload: CreateProductPayload = {
      variants,
      id: nanoid(),
      name: productName,
      description: productDescription,
    }

    createProduct(payload)
    
  }

  const { mutate: createProduct, isLoading: isCreatingProduct } = useMutation({
    mutationFn: async (payload:CreateProductPayload) => {
      const {data} = await axios.post('/api/product', payload)
      return data as string
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 409){
          return toastError('Product already exists','Please choose a different product name.')
        }

        if(err.response?.status === 422){
          return toastError('Invalid product name', 
            err.response.data[0].message || 'Please choose a different product name.')
        }

        if(err.response?.status === 401){
          return loginToast()
        }
      }
      return toastError('There was an error.','Could not create product.')
    },

    onSuccess: () => {
      router.back()
      router.refresh()
      resetUnsavedStates()
      toastDefault('Cheers!','A new product has been successfully created!')
    }

  })

  return(
    
    <div className='flex justify-center items-center w-full'>
      <div className='flex items-center h-full w-full max-w-2xl min-w-[100px]'>
        <div className='relative bg-white w-full h-fit rounded-lg space-y-5'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold'>Create a Product</h1>
          </div>

          <hr className='bg-zinc-500 h-px'/>

          <div>
            <p className="text-lg">Product Name</p>
            <p className="text-xs text-gray-500">{`You can change this later`}</p>
          </div>

          <Input 
          value={productName}
          onChange={(e)=>{ setProductName(e.target.value) }}
          className='border border-slate-700'/>

          <div>
            <p className="text-lg">Product Description</p>
            <p className="text-xs text-gray-500">{`You can change this later`}</p>
          </div>

          <Input 
          value={productDescription}
          onChange={(e)=>{ setProductDescription(e.target.value) }}
          className='border border-slate-700'/>

          <div>
            <p className="text-lg">Product Variants</p>
            <p className="text-xs text-gray-500">{`You can change this later`}</p>
          </div>

          <VariantShowcase/>
          
          {/* -------------- Submit Buttons -------------- */}

          <div className="flex justify-center md:justify-end gap-4 ">
            <Button variant='subtle' onClick={()=>router.back()}>Cancel</Button>
            <Button 
            type='submit'
            isLoading={isCreatingProduct || isUploading} 
            disabled={productName.length === 0 || isUploading || unsavedVariants.length === 0 || productDescription.length === 0}
            onClick={()=>handleSubmit()}>
              Create
            </Button>
          </div>

        </div>
      </div>
    </div>
    
  )
}

export default ProductCreate