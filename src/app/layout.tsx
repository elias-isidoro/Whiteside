import Footer from '@/components/global/Footer'
import NavBar from '@/components/navbar/NavBar'
import Providers from '@/components/reactquery/Providers'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Whiteside',
  description: 'From trendy fashion to cutting-edge electronics and everything in between. Find the latest styles, top-notch quality, and unbeatable prices, all in one convenient place.',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ 
  children, 
  modal, 
}:{ 
  children: React.ReactNode, 
  modal: React.ReactNode,
}){
  return (
    <html lang='en' className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className={cn('min-h-screen pt-12 bg slate-50 antialiased')}>
        <Providers>
          {/*  @ts-expect-error server component */}
          <NavBar/>

          {modal}

          <div className={cn('container max-w-7xl mx-auto h-full pt-10 min-w-[280px]')}>
            {children}
            <Footer/>
          </div>

          <Toaster/>
        </Providers>
      </body>
    </html>
  )
}
