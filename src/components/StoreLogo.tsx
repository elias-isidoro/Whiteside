'use client'

import Link from 'next/link'
import { Icons } from './Icons'
import { usePathname } from 'next/navigation'

const StoreLogo = () => {

  const pathname = usePathname()
  const isDashboard = pathname.split('/').includes('dashboard')

  return(
    <div className="flex h-full gap-2 items-center">
      <Link href={'/'}><Icons.whiteside className="h-9 w-9"/></Link>
      <p className="hidden text-zinc-700 text-xs font-semibold min-[620px]:block">{`Whiteside ${isDashboard?'Dashboard':'Storefront'}`}</p>
    </div>
  )
}

export default StoreLogo