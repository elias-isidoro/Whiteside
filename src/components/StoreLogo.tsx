import Link from 'next/link'
import { Icons } from './Icons'

const StoreLogo = () => {
  return(
    <Link href='/' className="hidden min-[350px]:flex h-full gap-2 items-center">
      <Icons.whiteside className="h-9 w-9"/>
      <p className="hidden text-zinc-700 text-sm font-medium min-[620px]:block">Whiteside</p>
    </Link>
  )
}

export default StoreLogo