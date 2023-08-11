import { Button, buttonVariants } from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import { toast } from "./use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const useCustomToast = () => {

  const router = useRouter()

  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'You need to be logged in to do that.',
      variant: 'default',
      action: (
        <Button onClick={()=>{
          router.replace('/sign-in')
          dismiss()
        }}>
          Login
        </Button>
      ),
    })
  }

  const cartToast = (message: string) => {
    const { dismiss } = toast({
      title: '',
      description: message,
      variant: 'default',
      action: (
        <Link 
        href={'/cart'} 
        onClick={()=>dismiss()}
        className={cn(buttonVariants(),'text-[10px] min-[400px]:text-xs flex justify-center items-center')}>
          View Cart
        </Link>
      ),
    })
  }

  return { loginToast, cartToast }
}