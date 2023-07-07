
import { RefObject, useState } from "react";


interface Props{
  previewRef: RefObject<HTMLImageElement>
}

const useImageInputManager = ({previewRef}:Props) => {

  
  const [image, setImage] = useState<File | null>(null);

  const handleInputChange = (file: File) => {
    if(!file) return
    if(!previewRef.current) return
    previewRef.current.src = URL.createObjectURL(file)
    setImage(file);
  };


  return { image, handleInputChange, setImage }

}

export default useImageInputManager