'use client'

import { useState } from "react"
import { Input } from "../ui/Input"
import { SearchIcon } from "lucide-react"

const SearchBar = () => {
  const [input, setInput] = useState('')
  
  return(
    <div className='relative flex h-full flex-grow items-center pr-2'>
      <Input 
      value={input}
      onChange={(e)=>{ setInput(e.target.value) }}
      placeholder="Search..."
      className='border border-gray-400 h-[35px] rounded-sm pl-[27px] text-xs'/>

      <div
      className="absolute left-0  ml-[2px] flex items-center justify-center aspect-square h-full w-[30px] text-gray-500">
        <SearchIcon className="h-4 w-4"/>
      </div>
    </div>
  )
}

export default SearchBar