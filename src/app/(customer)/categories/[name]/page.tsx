import { FC } from 'react'

interface Props {
  params: {
    name: string
  }
}

const page: FC<Props> = ({params: {name: categoryName}}) => {
  return(
    <div className=''>
      {categoryName}
    </div>
  )
}

export default page