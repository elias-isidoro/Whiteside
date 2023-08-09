

const Footer = () => {
  return (
    <footer>
      <div className="mt-10 flex flex-col gap-5 text-[11px] min-[300px]:text-xs">
        <hr/>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <p>&copy; {new Date().getFullYear()} Dean Kudou. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <p>Email: naed221@gmail.com</p>
            <p className="hidden min-[400px]:block">|</p>
            <p>Phone: +63 915-451-1087</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;