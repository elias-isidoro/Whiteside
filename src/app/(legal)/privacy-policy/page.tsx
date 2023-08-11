
const page = () => {
  return(
    <div className="container mx-auto pt-4 pb-8 max-w-[700px] px-0">
      <h1 className="text-xl min-[400px]:text-2xl font-bold mb-6">Privacy Policy</h1>

      <h2 className="text-lg min-[400px]:text-xl font-bold mb-4">Information We Collect</h2>
      <div className='flex flex-col gap-2'>
        <p className='text-xs min-[400px]:text-sm'>
          <strong>Personal Information:</strong> We may collect personal information such as your name, email address, and contact details when you voluntarily provide them to us.
        </p>
        <p className='text-xs min-[400px]:text-sm'>
          <strong>Usage Information:</strong> We may collect information about how you interact with our website and services, including your IP address, browser type, and device information. This information is collected through cookies and similar technologies.
        </p>
      </div>
      

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">How We Use Your Information</h2>
      <ul className="flex flex-col list-disc ml-8 text-xs min-[400px]:text-sm gap-4">
        <li>To Provide and Improve Our Services: We use your information to deliver the services you request, personalize your experience, and improve the functionality and performance of our website.</li>
        <li>To Communicate with You: We may use your contact information to send you important updates, respond to your inquiries, and provide customer support.</li>
        <li>To Protect Our Rights: We may use your information to detect, prevent, and address fraud, unauthorized access, or other illegal activities.</li>
      </ul>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Sharing of Information</h2>
      <p className='text-xs min-[400px]:text-sm'>
        We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted service providers who assist us in operating our website and providing our services. These third-party service providers are obligated to keep your information confidential and secure.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Data Security</h2>
      <p className='text-xs min-[400px]:text-sm'>
        We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Your Rights</h2>
      <p className='text-xs min-[400px]:text-sm'>
        You have the right to access, update, and correct your personal information. You may also request the deletion of your personal information, subject to any legal obligations we may have to retain certain data.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
      <p className='text-xs min-[400px]:text-sm'>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will be effective when posted.
      </p>

      <h2 className="text-lg min-[400px]:text-xl font-bold mt-8 mb-4">Contact Us</h2>
      <p className='text-xs min-[400px]:text-sm'>
        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at naed221@gmail.com.
      </p>
    </div>
  )
}

export default page