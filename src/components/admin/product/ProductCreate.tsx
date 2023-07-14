'use client'

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import VariantShowcase from "../variant/VariantShowcase";
import useImageUploader from "@/hooks/use-image-uploader";
import useCreateProduct from '@/queries/products/useCreateProduct';
import { useUnsavedProductStore } from "@/hooks/use-unsaved-product-store";
import useFetchAllProducts from "@/queries/products/useFetchAllProducts";
import { Pencil } from "lucide-react";

const ProductCreate = () => {

  const router = useRouter();
  const {refetch: refetchProductList} = useFetchAllProducts()

  const {uploadImages, isUploading} = useImageUploader({toastOnSuccess: false})
  const {
    productName, 
    unsavedVariants, 
    productDescription, 
    setProductName,
    resetStates,
    setProductDescription, 
  } = useUnsavedProductStore()

  const handleSubmit = async () => {
    const uploadResults = await uploadImages(
      unsavedVariants.map(({ image, id }) => ({ file: image, id }))
    );
    
    if (!uploadResults || unsavedVariants.length !== uploadResults.length) return;
    
    const variants = unsavedVariants.map((unsavedVariant, index) => ({
      id: unsavedVariant.id,
      tags: unsavedVariant.tags,
      price: unsavedVariant.price,
      imageUrl: uploadResults[index].url,
    }));
    
    createProduct({
      variants,
      id: nanoid(),
      name: productName,
      description: productDescription,
    });
  };

  const { mutate: createProduct, isLoading: isCreatingProduct } = useCreateProduct({
    onSuccessCallback: ()=> {
      resetStates()
      router.back()
      refetchProductList()
    }
  })

  return(
    <div className='flex justify-center items-center w-full'>
      <div className='flex items-center h-full w-full max-w-2xl min-w-[100px]'>
        <div className='relative bg-white w-full h-fit rounded-lg space-y-5'>
          <div className='flex gap-2 items-center'>
            <Pencil/>
            <h1 className='text-lg font-semibold'>Create a Product</h1>
          </div>

          <hr className='bg-zinc-500 h-px'/>

          <div>
            <p className="text-md">Name</p>
            <p className="text-xs text-gray-500">{`You can change this later`}</p>
          </div>

          <Input 
          value={productName}
          onChange={(e)=>{ setProductName(e.target.value) }}
          className='border border-slate-700'/>

          <div>
            <p className="text-md">Description</p>
            <p className="text-xs text-gray-500">{`You can change this later`}</p>
          </div>

          <Input 
          value={productDescription}
          onChange={(e)=>{ setProductDescription(e.target.value) }}
          className='border border-slate-700'/>

          <div>
            <p className="text-md">Variants</p>
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