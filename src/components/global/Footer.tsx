

const Footer = () => {
  return (
    <footer>
      <div className="mt-10 flex flex-col gap-5 text-xs">
        <hr/>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <p>&copy; {new Date().getFullYear()} Dean Kudou. All rights reserved.</p>
          </div>
          <div className="flex flex-row">
            <p>Contact us: naed221@gmail.com | Phone: +63 915-451-1087</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;