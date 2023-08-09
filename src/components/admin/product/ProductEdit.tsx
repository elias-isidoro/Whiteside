'use client'

import { ComboBox } from '@/components/ui/ComboBox'
import { Input } from '@/components/ui/Input'
import { Pencil, Trash2 } from 'lucide-react'
import { notFound, useRouter } from 'next/navigation'
import VariantShowcase from '../variant/VariantShowcase'
import { Button } from '@/components/ui/Button'
import { Variant, useUnsavedProductStore } from '@/stores/use-unsaved-product-store'
import useFetchAllCategories from '@/queries/categories/useFetchAllCategories'
import { nanoid } from 'nanoid'
import useUpdateProduct from '@/queries/products/useUpdateProduct'
import useFetchAllProducts from '@/queries/products/useFetchAllProducts'
import useDeleteProduct from '@/queries/products/useDeleteProduct'
import { useEffect } from 'react'
import useFetchProduct from '@/queries/products/useFetchProduct'
import { Product } from '@prisma/client'
import useImageUploader from '@/hooks/use-image-uploader'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

interface Props {
  userId: string
  productId: string
}

const ProductEdit = ({ userId, productId }: Props) => {

  const router = useRouter();

  const {
    keepStates,
    productName, 
    productDescription, 
    productCategoryId,
    productVariants,
    setProductName,
    setProductCategoryId,
    setProductDescription, 
    setProductVariants,
    setKeepStates,
    resetStates
  } = useUnsavedProductStore()

  const {data: product, refetch: refetchProduct, isLoading: isFetchingProduct} = useFetchProduct({productId})
  const {data: categories, isLoading: isFetchingCategories} = useFetchAllCategories()
  const {uploadImages, isUploading: isUploadingImages} = useImageUploader({toastOnSuccess:false})
  const {refetch: refetchAllProducts} = useFetchAllProducts()

  const {mutate: updateProduct, isLoading: isUpdatingProduct} = useUpdateProduct({
    onSuccessCallback: () => {
      router.back()
      refetchProduct()
      refetchAllProducts()
      resetStates()
    }
  })

  const {mutate: deleteProduct, isLoading: isDeletingProduct} = useDeleteProduct({
    onSuccessCallback: () => {
      router.back()
      refetchAllProducts()
      resetStates()
    }
  })


  useEffect(()=> {
    if(!product) return
    const {categoryId, description, name, variants} = product
    setProductName({value:name, isFirstValue: keepStates})
    setProductCategoryId({value:categoryId, isFirstValue: keepStates})
    setProductDescription({value:description, isFirstValue: keepStates})
    setProductVariants({value: variants.map(({imageUrl,...rest})=>({...rest,image:imageUrl})), isFirstValue: keepStates})

    return ()=> { 
      setKeepStates(false) 
    }
  }, [keepStates, product, setKeepStates, setProductCategoryId, setProductDescription, setProductName, setProductVariants])

  if(isFetchingCategories || isFetchingProduct){
    return <>Loading</>
  }

  if(!categories || !product){
    return notFound()
  }

  
  const handleDelete = () => deleteProduct({id: productId})
  const handleCategoryChange = (categoryId: string) => setProductCategoryId({value:categoryId})

  const handleSubmit = async () => {

    const { fileVariants: newVariants, stringVariants } = productVariants.reduce(
      (acc:{fileVariants:Variant[], stringVariants:Variant[]}, item) => {
        if (item.image instanceof File) {
          acc.fileVariants.push(item);
        } else {
          acc.stringVariants.push(item);
        }
        return acc;
      },
      { fileVariants: [], stringVariants: [] }
    );

    const uploadResults = await uploadImages(newVariants.map(({ image, id }) => ({ file: image as File, id })) );
    
    if (!uploadResults || newVariants.length !== uploadResults.length) return;
    
    const newlyUploadedVariants = newVariants
    // eslint-disable-next-line no-unused-vars
    .map(({image, imageSignature, imageOrientation, ...rest}, index) => {
      const {url: imageUrl, fileId, orientation} = uploadResults[index]
      return {imageUrl, imageSignature: fileId, imageOrientation: orientation, ...rest}
    });

    const oldAndKeptVariants = stringVariants
    .map(({image,...rest}) => ({ imageUrl: image as string, ...rest }));
    
    updateProduct({
      id: productId,
      name: productName,
      description: productDescription,
      categoryId: productCategoryId === '' ? null : productCategoryId,
      variants: [...oldAndKeptVariants,...newlyUploadedVariants]
    });
  };

  
  return(
    <div className='flex justify-center items-center w-full'>
      <div className='flex items-center h-full w-full max-w-lg min-w-[100px]'>
        <div className='relative w-full h-fit rounded-lg space-y-5'>
          <div className='flex gap-2 items-center'>
            <Pencil/>
            <h1 className='text-lg font-semibold'>Edit a Product</h1>
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
              boxPlaceholder={product.Category ? product.Category.name : "Select Category"}
              defaultPlaceHolder={'Select Category'}
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
            <VariantShowcase productId={productId} variants={productVariants}/>
          </div>

          {(product.authorId!==userId)&&(
            <div className='text-xs p-4 border-2 border-orange-600 bg-orange-200 text-orange-600'>
              You cannot edit this product. Only products that you have created can be edited.
            </div>
          )}

          
          {/* -------------- Submit Buttons -------------- */}

          <div className="flex flex-row w-full gap-2 items-center">
            <Button 
            disabled={isUpdatingProduct || isDeletingProduct || isUploadingImages || product.authorId !== userId}
            variant={'ghost'} 
            onClick={handleDelete} 
            isLoading={isDeletingProduct}>
              {!isDeletingProduct&&<Trash2 color='red' className='h-5 w-5 sm:h-6 sm:w-6'/>}
            </Button>
            
            <div className='flex-grow'/>
            
            <Button 
            variant='subtle' 
            className='text-xs'
            onClick={()=>router.back()}
            disabled={isUpdatingProduct || isDeletingProduct || isUploadingImages}>
              Cancel
            </Button>
            <Button 
            type='submit'
            variant={'secondary'}
            onClick={()=>handleSubmit()}
            isLoading={isUpdatingProduct} 
            disabled={checkifTwoProductStatesAreEqual({
              productName, 
              productDescription, 
              productCategoryId,
              productVariants
            },product as Product) 
              || isUploadingImages
              || isDeletingProduct 
              || productName.length === 0 
              || isUpdatingProduct 
              || productDescription.length === 0
              || product.authorId !== userId
            }
            className='text-xs'>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductEdit

interface ProductStates {
  productName: string
  productDescription: string
  productCategoryId: string | null
  productVariants: Variant[]
}

const checkifTwoProductStatesAreEqual = (a: ProductStates, b: Product) => {
  if (
    a.productName !== b.name ||
    a.productDescription !== b.id ||
    a.productCategoryId !== b.categoryId
  ) {
    return false;
  }

  return true;
};