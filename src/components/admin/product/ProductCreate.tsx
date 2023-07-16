'use client'

import { Button } from "@/components/ui/Button";
import { ComboBox } from "@/components/ui/ComboBox";
import { Input } from "@/components/ui/Input";
import useImageUploader from "@/hooks/use-image-uploader";
import { useUnsavedProductStore } from "@/hooks/use-unsaved-product-store";
import useFetchAllCategories from "@/queries/categories/useFetchAllCategories";
import useCreateProduct from '@/queries/products/useCreateProduct';
import useFetchAllProducts from "@/queries/products/useFetchAllProducts";
import { Pencil } from "lucide-react";
import { nanoid } from "nanoid";
import { notFound, useRouter } from "next/navigation";
import VariantShowcase from "../variant/VariantShowcase";

const ProductCreate = () => {

  const router = useRouter();
  const {refetch: refetchProductList} = useFetchAllProducts()
  const {data: categories, isLoading: isFetchingCategories} = useFetchAllCategories()

  const {uploadImages, isUploading: isUploadingImages} = useImageUploader({toastOnSuccess: false})
  
  const {
    productName, 
    productVariants, 
    productDescription, 
    productCategoryId,
    setProductName,
    resetStates,
    setProductCategoryId,
    setProductDescription, 
  } = useUnsavedProductStore()

  const handleSubmit = async () => {

    const uploadResults = await uploadImages(
      productVariants
      .filter(({image}) => image instanceof File)
      .map(({ image, id }) => ({ file: image as File, id }))
    );
    
    if (!uploadResults || productVariants.length !== uploadResults.length) return;
    
    // eslint-disable-next-line no-unused-vars
    const variants = productVariants.map(({image, imageSignature, ...rest}, index) => {
      const {url: imageUrl, fileId} = uploadResults[index]
      return {imageUrl, imageSignature: fileId, ...rest}
    });
    
    createProduct({
      variants,
      id: nanoid(),
      name: productName,
      description: productDescription,
      categoryId: productCategoryId === '' ? null : productCategoryId
    });
  };

  const { mutate: createProduct, isLoading: isCreatingProduct } = useCreateProduct({
    onSuccessCallback: ()=> {
      resetStates()
      router.back()
      refetchProductList()
    }
  })

  if(isFetchingCategories){
    return <>Loading</>
  }

  if(!categories){
    return notFound()
  }

  const handleCategoryChange = (categoryId: string) => setProductCategoryId({value:categoryId})

  return(
    <div className='flex justify-center items-center w-full'>
      <div className='flex items-center h-full w-full max-w-lg min-w-[100px]'>
        <div className='relative w-full h-fit rounded-lg space-y-5'>
          <div className='flex gap-2 items-center'>
            <Pencil/>
            <h1 className='text-lg font-semibold'>Create a Product</h1>
          </div>

          <hr className='bg-zinc-500 h-px'/>
          
          <div className="flex flex-row flex-wrap gap-4">
            <div className="flex flex-col flex-grow gap-1">
              <p className="text-xs text-gray-500">Name</p>
              <Input 
              value={productName} 
              onChange={({target:{value}})=>setProductName({value})}
              className='border border-slate-500 text-xs h-fit p-2 rounded-sm'/>
            </div>

            <div className="flex flex-col flex-grow basis-[100px] gap-1">
              <p className="text-xs text-gray-500">Category</p>
              <ComboBox
              className='w-full border border-slate-500 text-xs h-fit p-2 rounded-sm'
              value={productCategoryId || nanoid()}
              onUpdate={handleCategoryChange}
              boxPlaceholder="Select Category"
              searchPlaceholder="Search Category"
              emptyPlaceholder="No categories found."
              itemset={categories.map(({id,name})=>({ value: id, label:name }))}/>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <p className="text-xs text-gray-500">Description</p>
              <Input 
              value={productDescription}
              onChange={({target:{value}})=>{setProductDescription({value})}}
              className='border border-slate-500 text-xs h-fit p-2 rounded-sm'/>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-500">Variants</p>
            <VariantShowcase variants={productVariants}/>
          </div>

          
          {/* -------------- Submit Buttons -------------- */}

          <div className="flex justify-center md:justify-end gap-4 ">
            <Button 
            variant='subtle' 
            className="text-sm"
            onClick={()=>router.back()}
            disabled={isCreatingProduct || isUploadingImages}>
              Cancel
            </Button>
            <Button 
            type='submit'
            className="text-sm"
            onClick={()=>handleSubmit()}
            isLoading={isCreatingProduct || isUploadingImages} 
            disabled={productName.length === 0 || isUploadingImages || isCreatingProduct || productVariants.length === 0 || productDescription.length === 0}>
              Create
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductCreate