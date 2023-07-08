import { FC } from 'react'

interface Props {
  params:{
    id: string
  }
}

const page: FC<Props> = ({params: {id: categoryId}}) => {
  return(
    <div className=''>
      {categoryId}
    </div>
  )
}

export default page