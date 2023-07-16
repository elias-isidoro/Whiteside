import { FC } from 'react'
import { Menu } from './DashNav'
import Link from 'next/link'

interface Props {
  text: Menu
  focus: Menu
  href: string
}

const DashTab: FC<Props> = ({focus, text, href}) => {
  return(
    <Link href={href} className='w-fit h-full bg-white flex-grow basis-1/3 min-[300px]:basis-1/6'>
      <p className={`px-4 py-2 h-full text-sm ${focus===text&&'bg-black text-white'}`}>
        {text}
      </p>
    </Link>
  )
}

export default DashTab