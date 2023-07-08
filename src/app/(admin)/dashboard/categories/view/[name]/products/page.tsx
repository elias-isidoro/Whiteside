import { FC } from 'react'

interface Props {
  params:{

  }
}

const page: FC<Props> = (props: any) => {
  console.log(props)
  return(
    <div className=''>
      page
    </div>
  )
}

export default page