import { UserCircle2 } from "lucide-react"
import { buttonVariants } from "./ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu"
import Link from "next/link"
import {cn} from "@/lib/utils"

const LoginDropdown = () => {
  
  return(
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={cn(buttonVariants({variant:'ghost'}),'flex items-center h-full text-xs p-0 text-gray-500 min-[550px]:hidden')}>
          <UserCircle2 className='h-9 w-9 text-gray-500' strokeWidth={'0.6px'}/>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white' align='end'>

        <DropdownMenuItem asChild>
          <Link href='/sign-in' className="text-sm gap-2"><p>Login</p></Link>
          
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/sign-up' className="text-sm"><p>Sign Up</p></Link>
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default LoginDropdown