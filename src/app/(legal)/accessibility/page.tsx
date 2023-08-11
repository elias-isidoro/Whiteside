import { FC } from 'react'

interface Props {
  
}

const page: FC<Props> = ({}) => {
  return(
    <div className="container mx-auto pt-4 pb-8 max-w-[700px] px-0">
      <h1 className="text-xl min-[400px]:text-2xl font-bold mb-6">Accessibility</h1>

      <h2 className="text-lg min-[400px]:text-xl font-bold mb-4">Our Commitment to Accessibility</h2>
      <p className='text-xs min-[400px]:text-sm'>
        We are committed to ensuring that our website is accessible to all users, regardless of their abilities or disabilities. We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards to provide a seamless and inclusive experience for everyone.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Accessibility Features</h2>
      <p className='text-xs min-[400px]:text-sm pb-4'>
        Here are some of the accessibility features we have implemented on our website:
      </p>
      <ul className="flex flex-col list-disc ml-8 text-xs min-[400px]:text-sm gap-4">
        <li>Keyboard Navigation: Our website can be fully navigated using a keyboard for users who have difficulty using a mouse.</li>
        <li>Alt Text for Images: We provide alternative text descriptions for images to ensure that users with visual impairments can understand the content.</li>
        <li>Color Contrast: We have optimized the color contrast of our website to make it easier for users with visual impairments to read and navigate.</li>
        <li>Resizable Text: Users can adjust the text size on our website to suit their preferences using their browser settings.</li>
      </ul>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Feedback and Assistance</h2>
      <p className='text-xs min-[400px]:text-sm'>
        We are continuously working to improve the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please let us know. Your feedback is valuable to us and will help us enhance the accessibility of our website.
      </p>
      <p className='text-xs min-[400px]:text-sm'>
        If you need further assistance or have any questions regarding the accessibility of our website, please contact our support team at [contact email].
      </p>
    </div>
  )
}

export default page