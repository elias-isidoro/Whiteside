import Link from "next/link"
import { Button, buttonVariants } from "./ui/Button"
import { MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const MenuBar = () => {
  return(
    <div className='flex flex-row items-center h-full w-fit'>
      <Link href={'/'} className={cn(buttonVariants({variant:'ghost'}),'hidden text-xs min-[500px]:flex hover:bg-white')}>Categories</Link>
      <Button variant={'ghost'} className="-ml-2 px-2 min-[500px]:hidden min-[350px]:ml-auto min-[350px]:px-4"><MenuIcon/></Button>
    </div>
  )
}

export default MenuBar