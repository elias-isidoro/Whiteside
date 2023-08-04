'use client'

import Link from 'next/link'
import { Icons } from './Icons'
import { usePathname } from 'next/navigation'

const StoreLogo = () => {

  const pathname = usePathname()
  const isDashboard = pathname.split('/').includes('dashboard')
  const isManagement = pathname.split('/').includes('management')

  return(
    <div className="flex h-full gap-2 items-center pr-2">
      <Link href={'/'}><Icons.whiteside className="h-9 w-9"/></Link>
      <p className="hidden text-zinc-700 text-sm font-semibold min-[620px]:block">{`Whiteside ${isDashboard?'Dashboard':isManagement?'Management':'Storefront'}`}</p>
    </div>
  )
}

export default StoreLogo