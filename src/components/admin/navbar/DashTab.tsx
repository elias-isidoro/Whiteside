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
    <Link href={href} className={`flex justify-center items-center font-medium text-xs flex-grow basis-1/3 min-[350px]:basis-1/6 rounded-sm p-2 ${focus===text?'bg-black text-white':'bg-transparent text-slate-900'}`}>
      {text}
    </Link>
  )
}

export default DashTab