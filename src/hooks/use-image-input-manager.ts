
import { RefObject, useState } from "react";


interface Props{
  previewRef: RefObject<HTMLImageElement>
  value?: string | File | null
}

const useImageInputManager = ({previewRef, value=null}:Props) => {

  const [image, setImage] = useState<File | null | string>(value);

  const handleInputChange = (input: File | string) => {
    if(!input) return
    if(!previewRef.current) return
    previewRef.current.src = input instanceof File ? URL.createObjectURL(input) : input
    setImage(input);
  };

  return { image, handleInputChange, setImage }

}

export default useImageInputManager