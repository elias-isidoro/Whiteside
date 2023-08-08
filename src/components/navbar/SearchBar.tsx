'use client'

import { Input } from "../ui/Input"
import { SearchIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useSearchStore } from "@/stores/use-search-store"

const SearchBar = () => {
  const { searchInput, setSearchInput } = useSearchStore()

  const pathname = usePathname()
  const isDashboard = pathname.split('/').includes('dashboard')
  const isManagement = pathname.split('/').includes('management')
  
  return(
    <div className='relative flex h-full flex-grow items-center pr-2'>
      <Input 
      disabled={isDashboard || isManagement}
      value={searchInput}
      onChange={(e)=>{ setSearchInput(e.target.value) }}
      placeholder="Search store..."
      className='border border-gray-400 h-[35px] rounded-sm pl-[27px] text-xs'/>

      <div
      className={`absolute left-0  ml-[2px] flex items-center justify-center aspect-square h-full w-[30px] ${isDashboard||isManagement?'text-gray-300':'text-gray-500'}`}>
        <SearchIcon className="h-4 w-4"/>
      </div>
    </div>
  )
}

export default SearchBar