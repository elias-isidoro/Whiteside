import { X } from "lucide-react"
import { Coffee } from "lucide-react"

interface VariantTagProps {
  tagName: string,
  // eslint-disable-next-line no-unused-vars
  removeTagCallback: (tag: string) => void,
  noDelete?: boolean
}

const VariantTag = ({ tagName, removeTagCallback, noDelete=false }: VariantTagProps) => {
  return (
    <div className={'flex flex-row bg-black rounded-sm justify-center items-center gap-0.5 p-2 pr-1'}>
      <p className="text-xs text-white">{tagName}</p>
      {noDelete?
      <Coffee color={'white'} className="h-[17px] cursor-default"/>
      :
      <X color={'white'} className="h-[17px] cursor-pointer" onClick={()=>removeTagCallback(tagName)}/>
      }
    </div>
  )
}

export default VariantTag