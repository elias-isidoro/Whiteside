import { FC } from 'react'

interface Props {
  params: {
    name: string
  }
}

const page: FC<Props> = ({params: {name}}) => {
  return(
    <div className=''>
      {name}
    </div>
  )
}

export default page