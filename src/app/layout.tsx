import NavBar from '@/components/NavBar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Whiteside',
  description: 'Discover a world of possibilities at Whiteside, your ultimate online shopping destination! From trendy fashion to cutting-edge electronics and everything in between, we have it all. Find the latest styles, top-notch quality, and unbeatable prices, all in one convenient place. Shop with confidence, knowing that our secure checkout ensures your personal information is always protected. With fast shipping and exceptional customer service, your shopping experience at Whiteside will be nothing short of amazing. Start exploring now and unleash the joy of online shopping!',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ 
  children, 
  authModal, 
  crudModal,
  mainModal,
}:{ 
  children: React.ReactNode, 
  authModal: React.ReactNode, 
  crudModal: React.ReactNode, 
  mainModal: React.ReactNode
}){
  return (
    <html lang='en' className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className={cn('min-h-screen pt-12 bg slate-50 antialiased')}>
        <Providers>
          {/*  @ts-expect-error server component */}
          <NavBar/>

          {authModal}
          {crudModal}
          {mainModal}

          <div className={cn('container max-w-7xl mx-auto h-full pt-10 min-w-[280px]')}>
            {children}
          </div>

          <Toaster />

        </Providers>
      </body>
    </html>
  )
}
