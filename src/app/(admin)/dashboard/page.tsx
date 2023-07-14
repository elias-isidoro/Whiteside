import { buttonVariants } from '@/components/ui/Button'
import checkAuthorization from '@/lib/authorizer'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

const page = async () => {

  await checkAuthorization()

  return(
    <>
      <h1 className='font-bold text-3xl md:text-4xl'>
        Welcome to Dashboard!
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>

        <div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
          <div className='bg-emerald-100 px-6 py-4'>
            <p className='font-semibold py-3 flex items-center gap-1.5'>
              <LayoutDashboard/>
              Product Categories
            </p>
          </div>

          <div className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
              <p className='text-zinc-500'>
                {`The dashboard is designed to give you an overview of your ecommerce website's sales and activity.`}
              </p>
            </div>
            <Link className={buttonVariants({className:'w-full mt-4 mb-6'})} href='/dashboard/categories'>View Categories</Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default page