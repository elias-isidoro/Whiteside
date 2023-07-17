import ProductView from '@/components/customer/product/ProductView'

interface Props {
  params: {
    id: string
  }
}

const page = ({params: {id}}: Props) => {
  return(
    <ProductView productId={id}/>
  )
}

export default page