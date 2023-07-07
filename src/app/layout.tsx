import NavBar from '@/components/NavBar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ 
  children, 
  authModal, 
  createModal 
}:{ 
  children: React.ReactNode, 
  authModal: React.ReactNode, 
  createModal: React.ReactNode 
}){
  return (
    <html lang='en' className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className={cn('min-h-screen pt-12 bg slate-50 antialiased')}>
        <Providers>
          {/*  @ts-expect-error server component */}
          <NavBar/>

          {authModal}
          {createModal}

          <div className={cn('container max-w-[800px] mx-auto h-full pt-12 min-w-[280px]')}>
            {children}
          </div>

          <Toaster />

        </Providers>
      </body>
    </html>
  )
}
