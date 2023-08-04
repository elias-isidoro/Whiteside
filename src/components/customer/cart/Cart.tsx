'use client'

import { User } from "next-auth"
import CartItem from "./CartItem"
import { useCartStore } from "@/stores/use-cart-store"
import { Button } from "@/components/ui/Button"
import { numberToPriceFormat } from "@/lib/utils"
import { MinusCircle } from "lucide-react"
import usePaymentLink from "@/queries/payment/usePaymentLink"
import { nanoid } from "nanoid"

interface Props {
  user: User
}

const Cart = ({user}:Props) => {

  const { items, clearCart } = useCartStore();
  const {mutate: createPaymentLink, isLoading: isCreatingPaymentLink} = usePaymentLink()

  const handleClearCart = () => clearCart()
  const handleCheckout = () => {
    createPaymentLink({
      amount: items.reduce((acc,item)=>(acc+(item.variant.price*item.quantity)),0),
      description: items.map(({quantity,name,variant:{tags}})=>{
        return `${quantity}x ${name} (${JSON.parse(tags).join(',')})`
      }).join(', '),
      remarks: `${user.name}${nanoid()}`
    })
  }

  return(
    <div className='flex flex-col w-full py-4 gap-4 min-[400px]:px-4'>
      <h1 className="text-md font-semibold">{`${user.name}'s Cart`}</h1>
      <hr/>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='flex flex-col w-full text-sm gap-1'>
          <div className='w-full flex flex-col'>
              {items.map((item) => <CartItem key={`cartItem_${item.id}`} item={item}/>)}
          </div>

          <hr/>

          <div className="w-full flex flex-row">
            <div className='relative flex-grow h-[40px]'>
              <div className='absolute inset-0 flex items-center'>
                <p className='text-xs min-[455px]:text-sm overflow-hidden whitespace-nowrap text-ellipsis my-auto group-hover:underline cursor-pointer'>
                  Total
                </p>
              </div>  
            </div>

            <div className='text-xs flex items-center min-w-[95px] max-w-[95px] min-[455px]:text-sm whitespace-nowrap'>
              {`₱ ${numberToPriceFormat(items.reduce((acc,item)=>(acc+(item.variant.price*item.quantity)),0))}`}
            </div>

            <div className='flex justify-center items-center pl-2 min-[500px]:pl-10 '>
              <MinusCircle className={'rounded-full p-0 h-auto w-auto opacity-0'}/>
            </div>
          </div>

          <hr/>

          <div className="w-full flex flex-row gap-2 justify-end py-2">
            <Button onClick={handleClearCart} variant="destructive" className="text-xs w-auto h-auto p-2 rounded-sm">
              Clear Cart
            </Button>
            <Button 
            onClick={handleCheckout} 
            isLoading={isCreatingPaymentLink}
            className="text-xs w-auto h-auto px-2 py-2.5 rounded-sm">
              Checkout
            </Button>
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart