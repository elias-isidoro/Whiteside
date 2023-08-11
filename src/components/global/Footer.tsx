import { Mail } from "lucide-react";
import Link from "next/link";


const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col gap-5 text-[10px] min-[350px]:text-xs py-10">
        <hr/>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <p>&copy; {new Date().getFullYear()} Dean Kudou. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className='flex flex-row flex-wrap gap-1'>
              <Link href='/privacy-policy'>Privacy Policy</Link>
              <p>|</p>
              <Link href='/terms-of-use'>Terms of Use</Link>
              <p>|</p>
              <Link href='/accessibility'>Accessibility</Link>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Mail className="w-3 h-3 min-[350px]:h-4 min-[350px]:w-4" strokeWidth={'1px'}/>
              <p>naed221@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;