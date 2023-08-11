import { FC } from 'react'

interface Props {
  
}

const page: FC<Props> = ({}) => {
  return(
    <div className="container mx-auto pt-4 pb-8 max-w-[700px] px-0">
      <h1 className="text-xl min-[400px]:text-2xl font-bold mb-6">Terms of Use</h1>

      <h2 className="text-lg min-[400px]:text-xl font-bold mb-4">Acceptance of Terms</h2>
      <p className='text-xs min-[400px]:text-sm'>
        By accessing and using this website, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use the website.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Intellectual Property</h2>
      <p className='text-xs min-[400px]:text-sm'>
        All content on this website, including text, graphics, logos, and images, is the property of our company and is protected by intellectual property laws. You may not use, reproduce, or distribute any content from this website without our prior written permission.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Disclaimer of Warranty</h2>
      <p className='text-xs min-[400px]:text-sm'>
        {`This website is provided on an "as is" and "as available" basis. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. You use the website at your own risk.`}
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Limitation of Liability</h2>
      <p className='text-xs min-[400px]:text-sm'>
        In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the website. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Governing Law</h2>
      <p className='text-xs min-[400px]:text-sm'>
        These Terms of Use shall be governed by and construed in accordance with the laws of The Philippines. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in the Philippines.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Changes to Terms</h2>
      <p className='text-xs min-[400px]:text-sm'>
        We reserve the right to modify or update these Terms of Use at any time. Any changes will be effective immediately upon posting on the website. It is your responsibility to review the terms periodically for any updates.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Contact Us</h2>
      <p className='text-xs min-[400px]:text-sm'>
        If you have any questions or concerns about these Terms of Use, please contact us at naed221@gmail.com.
      </p>
    </div>
  )
}

export default page