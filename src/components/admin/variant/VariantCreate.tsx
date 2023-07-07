'use client'

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import useTagManager from "@/hooks/use-tag-manager";
import { checkIfInputIsValidPrice, toastError } from "@/lib/utils";
import { ImagePlus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FileUploader } from 'react-drag-drop-files';
import VariantTag from "./VariantTag";
import useImageInputManager from "@/hooks/use-image-input-manager";
import { useUnsavedProductStore } from "@/hooks/use-unsaved-product-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPesoSign } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

const VariantCreate = () => {

  const router = useRouter();
  const previewRef = useRef<HTMLImageElement>(null)
  const [price, setPrice] = useState('')
  const {addTag, removeTag, setNewTag, tags, newTag} = useTagManager()
  const {handleInputChange, image} = useImageInputManager({previewRef})
  const {addUnsavedVariant} = useUnsavedProductStore()

  const cacheVariant = () => {
    if(!checkIfInputIsValidPrice(price)){
      toastError('Invalid Price', 'Please only input numbers and decimals')
      return
    }

    addUnsavedVariant({
      image: image!,
      tags: JSON.stringify(tags),
      price: parseFloat(price),
      id: nanoid()
    })

    router.back()
    router.refresh()
  }

  return(
    <div className="flex flex-col w-full items-center justify-center gap-2  ">

      <div className="flex flex-col w-full max-w-[300px] gap-2">
        <div>
          <p className="text-lg font-medium">Create a Variant</p>
        </div>

        
        <div className="relative flex flex-row items-center">
          <div className="flex min-w-[50px] items-center"><p>{`Price:`}</p></div>
          <Input 
          value={price}
          onChange={(e)=>{ setPrice(e.target.value) }}
          placeholder="99.99"
          className='border-2 border-slate-700 h-[40px] rounded-none pr-[50px]'/>
          <div
          className="absolute right-0 aspect-square h-[40px] w-[40px] rounded-none bg-black flex items-center justify-center">
            <FontAwesomeIcon icon={faPesoSign} className='w-4 h-4 text-gray-100'/>
          </div>
        </div>

        <div className="relative flex flex-row items-center">
          <div className="flex min-w-[50px] items-center"><p>{`Tags:`}</p></div>
          <Input 
          value={newTag}
          onChange={(e)=>{ setNewTag(e.target.value) }}
          placeholder="Maroon, XL, etc.."
          className='border-2 border-slate-700 h-[40px] rounded-none pr-[50px]'/>

          <Button 
          type='submit'
          onClick={addTag}
          className="absolute right-0 aspect-square h-[40px] p-2 rounded-none ">
            <Plus className="w-full h-full"/>
          </Button>
        </div>
      </div>

      <div className="flex flex-row flex-wrap w-full max-w-[300px] gap-1">
        {tags.length===0?
        <VariantTag tagName="No Tags" removeTagCallback={()=>null} noDelete={true}/>
        :
        <> {tags.map((tag)=><VariantTag key={`${tag}`} tagName={tag} removeTagCallback={removeTag}/>)} </>
        }
      </div>

      {/* image  */}
      <div className="aspect-square flex flex-col w-full max-w-[300px]">
        <FileUploader
          name="file"
          maxSize={0.5}
          multiple={false}
          types={["JPEG", "PNG", "JPG"]}
          handleChange={handleInputChange}
          onSizeError={()=>toastError('Error','Image is too big (500KB max)')}>
          <div className="relative aspect-square flex flex-col flex-wrap items-center justify-center w-full border-2 border-black  cursor-pointer shadow-md">
            <img ref={previewRef} src="#" alt="variant preview" className="absolute inset-0 object-cover w-full h-full" style={{opacity:image!==null?1:0}}/>
            <ImagePlus/>
          </div>
        </FileUploader>
      </div>



      {/* submit button  */}
      <div className="flex flex-row flex-wrap w-full max-w-[300px] gap-2 justify-center items-center">
        <Button onClick={()=>router.back()} variant={'subtle'}>
          Cancel
        </Button>

        <Button onClick={cacheVariant} disabled={!image || tags.length==0 || price.length==0}>
          {/* {isUploading ? 'Creating...' : 'Create'} */}
          Create
        </Button>
      </div>
    </div>
    
  )
}

export default VariantCreate
